# 選擇 Node.js 的基礎映像檔
FROM node:20

# 設置工作目錄，WORKDIR 是 Dockerfile 的指令，用來設置在容器內部用於存儲應用程式檔案的目錄。
WORKDIR /app

# 複製所有
COPY . .

# 依照指定版本安裝依賴
RUN npm install

# 建立生產版本
RUN npm run build

# 暴露應用程式所使用的端口
EXPOSE 3000

# 啟動您的應用程式
# CMD 指令用於指定一個容器啟動時需要執行的命令。每個 Dockerfile 只能包含一個 CMD 指令。
# 總結來說，RUN 是在構建映像檔時執行的命令，而 CMD 是在容器啟動時執行的命令。
CMD ["npm","start"]
