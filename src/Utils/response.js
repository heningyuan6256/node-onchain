class ResponseData {
  code;
  result;
  message;
  constructor(data) {
    this.message = data?.message;
    this.result = data?.data;
    this.code = data?.code;
  }

  success(data) {
    this.code = 200;
    this.result = data;
    this.msg = "操作成功";
    return this;
  }

  error(msg) {
    this.code = 400;
    this.message = msg;
    return this;
  }
}

export default ResponseData;
