// 这里用到一个很实用的 npm 模块，用以在同一行打印文本
let slog = require("single-line-log").stdout;

/** cmd进度条 */
exports.ProgressBar = function(description, barLength) {
  // 两个基本参数(属性)
  this.description = description || "[progress]"; // 命令行开头的文字信息
  this.length = barLength || 25; // 进度条的长度(单位：字符)，默认设为 25
  // 刷新进度条图案、文字的方法
  this.render = function(opts) {
    let percent = (opts.completed / opts.total).toFixed(4); // 计算进度(子任务的 完成数 除以 总数)
    let cellNum = Math.floor(percent * this.length); // 计算需要多少个 █ 符号来拼凑图案
    // 拼接黑色条
    let cell = "";
    for (let i = 0; i < cellNum; i++) cell += "■";
    // 拼接灰色条
    let empty = "";
    for (let i = 0; i < this.length - cellNum; i++) empty += "□";
    // 拼接最终文本
    let cmdText = `${this.description} => ${cell}${empty} ${(100 * percent).toFixed(2)}%`;
    // 在单行输出文本
    slog(cmdText);
  };
};
