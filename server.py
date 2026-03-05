#!/usr/bin/env python3
"""
简单的本地开发服务器
用于运行启诚网站
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path
import contextlib

DEFAULT_PORT = int(os.environ.get("QICHENG_PORT", "8000"))
PORT_CANDIDATES = [DEFAULT_PORT] + [p for p in range(8001, 8011)]

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # 添加 CORS 头，允许跨域请求
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        # 设置正确的 MIME 类型
        if self.path.endswith('.css'):
            self.send_header('Content-Type', 'text/css; charset=utf-8')
        elif self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript; charset=utf-8')
        elif self.path.endswith('.json'):
            self.send_header('Content-Type', 'application/json; charset=utf-8')
        elif self.path.endswith('.svg'):
            self.send_header('Content-Type', 'image/svg+xml')
        elif self.path.endswith('.png'):
            self.send_header('Content-Type', 'image/png')
        elif self.path.endswith('.jpg') or self.path.endswith('.jpeg'):
            self.send_header('Content-Type', 'image/jpeg')
        super().end_headers()

    def log_message(self, format, *args):
        # 自定义日志格式
        print(f"[{self.log_date_time_string()}] {format % args}")

def pick_port():
    for port in PORT_CANDIDATES:
        with contextlib.suppress(OSError):
            with socketserver.TCPServer(("", port), MyHTTPRequestHandler) as test_server:
                return port
    raise OSError("No available port found in candidates")


def main():
    os.chdir(Path(__file__).parent)

    try:
        with socketserver.TCPServer(("", DEFAULT_PORT), MyHTTPRequestHandler) as _:
            port = DEFAULT_PORT
    except OSError:
        port = pick_port()

    Handler = MyHTTPRequestHandler

    with socketserver.TCPServer(("", port), Handler) as httpd:
        print(f"🚀 服务器已启动!")
        print(f"📍 访问地址: http://localhost:{port}")
        print(f"📁 服务目录: {os.getcwd()}")
        print(f"\n按 Ctrl+C 停止服务器\n")

        try:
            webbrowser.open(f'http://localhost:{port}')
        except:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n服务器已停止")

if __name__ == "__main__":
    main()
