  /**
   * jQuery MD5 hash algorithm function
   * /
  /*(function($){
    
  })(jQuery);*/

  function helloword() {
      console.log("helloword" + "---------");
  }

  //生成32位随机数
  function randomWord(min) {
      var str = " ",

          range = min,

          arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

      //随机产生

      for (var i = 0; i < range; i++) {

          pos = Math.round(Math.random() * (arr.length - 1));

          str += arr[pos]

          console.log(str)

          return str;
      }
  }

  function initJim() {

      window.JIM = new JMessage({
          debug: true
      });

      JIM.onDisconnect(function() {
          console.log("disconnect");
      }); //异常断线监听


      var appkey = '0fb7d8ab110fd8ed96944e0c';
      var timestamp = new Date().getTime(); //取时间戳到秒
      var randomstr = randomWord(32);

      //获取签名
      $.ajax({
          type: "GET",
          url: "https://conchgirl.applinzi.com/signtest.php",
          data: { "timestamp": timestamp, "appkey": appkey, "randomstr": randomstr },
          dataType: "text",
          success: function(data) {
              var signstr = data;
              JIM.init({
                  "appkey": appkey,
                  "random_str": randomstr,
                  "signature": signstr,
                  "timestamp": timestamp,
                  "flag": 1

              }).onSuccess(function(data) {
                  console.log('success:' + JSON.stringify(data));

              }).onFail(function(data) {
                  console.log('error:' + JSON.stringify(data))

              });



          }
      });
    }


      function getuserinfo(name) {

          JIM.getUserInfo({
              'username': name,
              'appkey': '0fb7d8ab110fd8ed96944e0c'
          }).onSuccess(function(data) {
              console.log(JSON.stringify(data) + "----------");
              //data.code 返回码
              //data.message 描述
              //data.user_info.username
              //data.user_info.appkey
              //data.user_info.nickname
              //data.user_info.avatar 头像
              //data.user_info.birthday 生日，默认空
              //data.user_info.gender 性别 0 - 未知， 1 - 男 ，2 - 女
              //data.user_info.signature 用户签名
              //data.user_info.region 用户所属地区
              //data.user_info.address 用户地址
              //data.user_info.mtime 用户信息最后修改时间
              //data.extras 自定义json字段
          }).onFail(function(data) {
              //data.code 返回码
              //data.message 描述
          });

      }

  

  function login(name, pwd) {

      JIM.login({
          'username': name, //cc003
          'password': pwd //C12345678a
      }).onSuccess(function(data) {
          window.localStorage.setItem("uname",name);
          window.localStorage.setItem("upwd",pwd);
          window.location.href = 'JGChatPg.html';

          // window.open("JGChatPg.html");

          // console.log("login success");
      }).onFail(function(data) {
          var code = data["code"];
          codejudge(code);

      });

  }

  function register(name, pwd) {

      JIM.register({
          'username': name,
          'password': pwd,
          'is_md5': false,
      }).onSuccess(function(data) {
          alert("注册成功");
          return;

      }).onFail(function(data) {

          var code = data["code"];
          codejudge(code);
      });


  }

  function codejudge(msgcode) {

      if (msgcode == 880001) {
          alert("未知错误码");
      } else if (msgcode == 880002) {
          alert("参数不合法");
      } else if (msgcode == 880003 || msgcode == 880004) {
          alert("非法内容格式");
      } else if (msgcode == 880005) {
          alert("文件不存在");
      } else if (msgcode == 880006) {
          alert("注册之前先退出");
      } else if (msgcode == 880007) {
          alert("限制注册");
      } else if (msgcode == 880008) {
          alert("msg_id 非法");
      } else if (msgcode == 880101) {
          alert("appkey不存在");
      } else if (msgcode == 880102) {
          alert("签名错误");
      } else if (msgcode == 880103) {
          alert("用户不存在");
      } else if (msgcode == 880104) {
          alert("密码错误");
      } else if (msgcode == 880106) {
          alert("签名过期");
      } else if (msgcode == 880107) {
          alert("已经是登录状态");
      } else if (msgcode == 880109) {
          alert("重复登录操作");
      } else if (msgcode == 880110) {
          alert("多通道错误，更新sdk版本");
      } else if (msgcode == 880111) {
          alert("用户被禁用");
      } else if (msgcode == 880203) {
          alert("目标用户不存在");
      } else if (msgcode == 880204) {
          alert("目标群组不存在");
      } else if (msgcode == 880205) {
          alert("用户不在群组");
      } else if (msgcode == 880206) {
          alert("消息大小超过限制");
      } else if (msgcode == 880207) {
          alert("用户被对方拉黑");
      } else if (msgcode == 880208) {
          alert("消息包含敏感词汇");
      } else if (msgcode == 880209) {
          alert("发送速度超过限制");
      } else if (msgcode == 880210) {
          alert("文件大小超过限制");
      } else if (msgcode == 880212) {
          alert("禁言中");
      } else if (msgcode == 880402) {
          alert("没有创建群组的权限");
      } else if (msgcode == 880403) {
          alert("群数量到达上限");
      } else if (msgcode == 880404) {
          alert("群名字超过长度限制，创建失败");
      } else if (msgcode == 880405) {
          alert("群描述长度超过限制");
      } else if (msgcode == 880602) {
          alert("目标为空");
      } else if (msgcode == 880604) {
          alert("没权限添加群成员");
      } else if (msgcode == 880606) {
          alert("成员列表中有用户没有被添加到群组的权限");
      } else if (msgcode == 880607) {
          alert("重复添加");
      } else if (msgcode == 880608) {
          alert("数量超过限制");
      } else if (msgcode == 880609) {
          alert("成员列表中存在成员的群组数量超过限制");
      } else if (msgcode == 880610) {
          alert("用户已经在群里面");
      } else if (msgcode == 880611) {
          alert("群类型不支持该操作");
      } else if (msgcode == 880612) {
          alert("已经处理");
      } else if (msgcode == 880614) {
          alert("无权限操作");
      } else if (msgcode == 880612) {
          alert("已经处理");
      } else if (msgcode == 880614) {
          alert("无权限操作");
      } else if (msgcode == 880704) {
          alert("你没有删除群成员的权限");
      } else if (msgcode == 880705) {
          alert("成员列表中存在成员用户没权限删除");
      } else if (msgcode == 880903) {
          alert("成员列表中有成员不能被添加，添加失败");
      } else if (msgcode == 880904) {
          alert("重复添加");
      } else if (msgcode == 881101) {
          alert("该成员已处于免打扰状态");
      } else if (msgcode == 881102) {
          alert("该成员不处于免打扰状态");
      } else if (msgcode == 882003) {
          alert("参数不合法");
      }


  }