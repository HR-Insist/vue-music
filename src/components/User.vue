<template>
  <div class="user">
    <div class="loginBtn">
      <!-- 登录后 -->
      <template v-if="isLogin">
        <img :src="$utils.getImgUrl(userImgUrl, 50)" class="userImg" />
        <ul class="user-wrap">
          <li>我的主页</li>
          <li>我的消息</li>
          <li>我的VIP</li>
          <li @click="outLogin">退 出</li>
        </ul>
      </template>
      <!-- 未登录 -->
      <template v-else>
        <el-button type="text" @click="loginDialogVisible = true" class="login">登录</el-button>
      </template>
    </div>
    <el-dialog title="登录" :visible.sync="loginDialogVisible" width="400px">
      <el-button class="blockBtn" type="primary" plain @click="handlePhoneLogin">手机登录</el-button>
      <el-button class="blockBtn" type="warning" plain>邮箱登录</el-button>
      <el-button class="blockBtn" type="info" plain @click="handleregister">注 册</el-button>
    </el-dialog>
    <el-dialog
      title="手机登录"
      :visible.sync="phoneLoginDialogVisible"
      width="400px"
      @close="dialogClosed('phoneLoginFormRef')"
    >
      <el-form ref="phoneLoginFormRef" :model="form" :rules="registerRules">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="form.phone">
            <template slot="prepend">86+</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="loginPassword">
          <el-input
            placeholder="请输入密码"
            v-model="form.loginPassword"
            :type="isShowPassword ? 'text' : 'password'"
            autocomplete="off"
            @keyup.enter.native="handldSubmitLogin('phoneLoginFormRef')"
          >
            <i
              slot="suffix"
              class="iconfont"
              :class="[isShowPassword ? 'icon-eyeshow' : 'icon-eyeclose' ]"
              @click="isShowPassword = !isShowPassword"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="btnGroup">
            <el-button type="primary" plain @click="goChoseMethods">上一步</el-button>
            <el-button
              :loading="loginLoading"
              type="primary"
              plain
              @click="handldSubmitLogin('phoneLoginFormRef')"
            >登 录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="注册"
      :visible.sync="registerPhoneDialogVisible"
      width="400px"
      @close="dialogClosed('registerPhoneFormRef')"
    >
      <el-form ref="registerPhoneFormRef" :model="form" :rules="registerRules">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="form.phone">
            <template slot="prepend">86+</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input placeholder="请输入验证码" v-model="form.captcha">
            <el-button
              slot="append"
              :disabled="isSendCaptchaDisabled"
              @click="getVerification('registerPhoneFormRef')"
            >获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="btnGroup">
            <el-button type="primary" plain @click="goChoseMethods">上一步</el-button>
            <el-button type="primary" plain @click="handldRegisterPhone('registerPhoneFormRef')">下一步</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="注册"
      :visible.sync="registerPasswordDialogVisible"
      width="400px"
      @close="dialogClosed('registerPasswordFormRef')"
    >
      <el-form ref="registerPasswordFormRef" :model="form" :rules="registerRules">
        <el-form-item prop="registerPassword">
          <el-input
            placeholder="请输入密码"
            v-model="form.registerPassword"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            placeholder="请再次输入密码"
            v-model="form.repassword"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input placeholder="请输入昵称" v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btnGroup">
            <el-button type="primary" plain @click="goChoseMethods">上一步</el-button>
            <el-button
              type="primary"
              plain
              @click="handldSubmitRegesiter('registerPhoneFormRef')"
            >注 册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { checkPhone, sendCaptcha, verifyCaptcha } from "@/api/regesiter";
import { phoneLogin, loginOut, getUserDetail } from "@/api/login";
import {} from "@/api/user";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "User",
  data() {
    const validatePhone = async (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入手机号！"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号！"));
      } else if (
        !this.phoneLoginDialogVisible &&
        (await this.isRegistered(value)) === 1
      ) {
        callback(new Error("该手机号已被注册！"));
      } else if (
        this.phoneLoginDialogVisible &&
        (await this.isRegistered(value)) === -1
      ) {
        callback(new Error("该手机号未注册！"));
      } else {
        this.isSendCaptchaDisabled = false;
        callback();
      }
    };
    const validateCaptcha = async (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入验证码！"));
      } else if ((await this.verifyCaptcha()) != 200) {
        callback(new Error("验证码错误！"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!/^(?=.*[a-zA-Z])(?=.*\d)[^]{2,}$/.test(value)) {
        callback(new Error("必须包含字母、数字"));
      } else {
        callback();
      }
    };
    const validateRepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码！"));
      } else if (value !== this.form.registerPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginLoading: false,
      loginDialogVisible: false,
      phoneLoginDialogVisible: false,
      registerPhoneDialogVisible: false,
      registerPasswordDialogVisible: false,
      isSendCaptchaDisabled: true,
      isShowPassword: false,
      form: {
        phone: "",
        captcha: "",
        loginPassword: "",
        registerPassword: "",
        repassword: "",
        nickname: "",
      },
      registerRules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }],
        loginPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        registerPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" },
          { min: 6, max: 16, message: "密码长度为6-16位", trigger: "blur" },
        ],
        repassword: [{ validator: validateRepassword, trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState("user", [
      "isLogin",
      "userId",
      "userImgUrl",
      "nickname",
      "token",
    ]),
  },
  // 自动登录
  async created() {
    const uid = window.sessionStorage.getItem("_music_uid_");
    if (uid) {
      this.onLogin(uid);
    }
  },
  methods: {
    ...mapMutations("user", [
      "setLoginStatus",
      "setUserId",
      "setToken",
      "setUserImgUrl",
      "setNickname",
    ]),
    ...mapActions("user", ["getUserPlaylist"]),
    async onLogin(uid) {
      const {
        profile: { avatarUrl, nickname, userId },
      } = await getUserDetail(uid);
      this.setUserState(userId, avatarUrl, nickname);
    },
    setUserState(uid, avatarUrl, nickname) {
      this.setLoginStatus(true);
      this.setUserId(uid);
      this.setUserImgUrl(avatarUrl);
      this.setNickname(nickname);
      this.getUserPlaylist(uid);
    },
    async outLogin() {
      const res = await loginOut();
      // console.log(res);
      if (res.code !== 200) {
        this.$message.error("退出登录失败！");
        return false;
      }
      this.$confirm("确定要注销吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "注销成功!",
          });
          this.setLoginStatus(false);
          this.setUserId("");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消注销！",
          });
        });
    },
    handlePhoneLogin() {
      this.loginDialogVisible = false;
      this.phoneLoginDialogVisible = true;
    },
    handleregister() {
      this.registerPhoneDialogVisible = true;
      this.loginDialogVisible = false;
    },
    goChoseMethods() {
      this.loginDialogVisible = true;
      this.phoneLoginDialogVisible = false;
      this.registerPhoneDialogVisible = false;
    },
    handldSubmitLogin(formRef) {
      this.$refs[formRef].validate(async (valid) => {
        if (!valid) return false;
        const res = await phoneLogin({
          phone: this.form.phone,
          password: this.form.loginPassword,
        });
        if (res.code != 200) {
          this.$message.error("密码错误，请重试！");
          return false;
        }
        this.phoneLoginDialogVisible = false;
        this.setUserState(
          res.profile.userId,
          res.profile.avatarUrl,
          res.profile.nickname
        );
      });
    },
    getVerification(formRef) {
      this.$refs[formRef].validateField("phone", async (error) => {
        if (error) return false;
        else {
          const { code } = await sendCaptcha(this.form.phone);
          if (code === 200) {
            this.$message.success("验证码发送成功！");
            this.isSendCaptchaDisabled = true;
            setTimeout(() => {
              this.isSendCaptchaDisabled = false;
            }, 60000);
          } else this.$message.error("验证码发送失败，请重试！");
        }
      });
    },
    handldRegisterPhone(formRef) {
      this.$refs[formRef].validate(async (valid) => {
        if (!valid) return false;
        this.registerPhoneDialogVisible = false;
        this.registerPasswordDialogVisible = true;
      });
    },
    handldSubmitRegesiter(formRef) {
      this.$refs[formRef].validate(async (valid) => {
        if (!valid) return false;
      });
    },
    dialogClosed(formRef) {
      this.$refs[formRef].resetFields();
      this.isSendCaptchaDisabled = true;
    },
    async isRegistered(phone) {
      const { exist } = await checkPhone(phone);
      return exist;
    },
    async verifyCaptcha() {
      const { code } = await verifyCaptcha({
        phone: this.form.phone,
        captcha: this.form.captcha,
      });
      return code;
    },
  },
};
</script>

<style lang='scss' scoped>
.user {
  .loginBtn {
    position: relative;
    margin-left: 30px;
    height: 60px;
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      width: 35px;
      height: 35px;
      cursor: pointer;
    }
    &:hover ul {
      display: block;
    }

    ul {
      position: absolute;
      display: none;
      top: 50px;
      left: -30px;
      background-color: #f3f3f3;
      border-radius: 4px;
      color: #686565;
      font-size: 14px;
      z-index: 111;
      &:hover {
        display: block;
      }
      li {
        width: 100px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        &:hover {
          cursor: pointer;
          background-color: #e4e4e4;
        }
      }
    }
  }
  .el-dialog {
    .blockBtn {
      display: block;
      width: 100%;
      margin: 0 auto 15px;
    }
    .btnGroup {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .el-button {
        width: 45%;
      }
    }
  }
}
</style>