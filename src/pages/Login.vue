<template>
  <div id="login-form-wrapper" class="d-flex justify-content-center h-100">
    <div class="card">
      <div class="card-header">
        <h3>{{$t('auth.login')}}</h3>
        <div class="d-flex justify-content-end social_icon">
          <span>
            <i class="fab fa-facebook-square"></i>
          </span>
          <span>
            <i class="fab fa-google-plus-square"></i>
          </span>
          <span>
            <i class="fab fa-twitter-square"></i>
          </span>
        </div>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent>
          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-at"></i>
              </span>
            </div>
            <input name="email" v-model="$v.email.$model" type="text" class="form-control" :class="{ 'is-invalid': $v.email.$error}" :placeholder="$t('auth.emailPlaceholder')">
          </div>
          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-key"></i>
              </span>
            </div>
            <input name="password" v-model="$v.password.$model" type="password" class="form-control" :class="{ 'is-invalid': $v.password.$error}"  :placeholder="$t('auth.passwordPlaceholder')">
          </div>
          <div class="row align-items-center remember">
            <input name="rememberme" type="checkbox" v-model="rememberme">{{$t('auth.rememberMe')}}
          </div>
          <div class="form-group">
            <input type="submit" v-on:click="login" :value="$t('auth.doLogin')" class="btn float-right login_btn">
          </div>
        </form>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-center links">
          {{$t('auth.registerLinkBeforeText')}} <router-link to='/register'>{{$t('auth.registerLink')}}</router-link>
        </div>
        <div class="d-flex justify-content-center">
          <a href="#">{{$t('auth.fogotPassword')}}</a>
        </div>
      </div>
    </div>
    
    <notifications position="bottom center"/>
  
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  data () {
    return {
      email: '',
      password: '',
      rememberme: true
    };
  },

  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(3)
    }
  },

  methods: {
    login: function() {
      this.$v.$touch();
      if (this.$v.$invalid){
        this.$notify({type: 'error', text: 'Ошибки заполнения формы'});
        return;
      };

      this.$auth.login({
        url: 'login',
        data: {email: this.email, password: this.password, rememberme: this.rememberme},
        rememberMe: this.rememberme,
        redirect: {name: 'home'},
        error: function (error){
          this.$auth.logout();
        }
      });
      },
  },
}
</script>


<style scoped>
#login-form-wrapper {
  border: none;
}

.card {
  /* height: 370px; */
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.5) !important;
  overflow: visible;
}

.card h3{
  box-shadow: none;
  padding: inherit;
  margin: inherit;
}
.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #ffc312;
}

.social_icon span:hover {
  color: white;
  cursor: pointer;
}

.card-header h3 {
  color: white;
  background: none;
  border: none;
}

.social_icon {
  position: absolute;
  right: 20px;
  top: -45px;
}

.input-group-prepend span {
  width: 50px;
  background-color: #ffc312;
  color: black;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.remember {
  color: white;
}

.remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.login_btn {
  color: black;
  background-color: #ffc312;
  width: 100px;
}

.login_btn:hover {
  color: black;
  background-color: white;
}

.links {
  color: white;
}

.links a {
  margin-left: 4px;
}
</style>
