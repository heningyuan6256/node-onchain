# 使用 Node.js 的官方镜像作为基础镜像
FROM node:14

# 设置工作目录
WORKDIR /usr/src/app

# 将依赖文件复制到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 将源代码复制到工作目录
COPY . .

# 暴露应用程序的端口
EXPOSE 9588

# 启动应用程序
CMD ["node", "./src/index.js"]
