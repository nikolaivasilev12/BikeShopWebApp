<template>
<v-container>
    <!-- <v-form v-model="valid">
    <v-container>
        <div style="margin-top:70px;" class="display-1">Register new account</div>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            :rules="nameRules"
            :counter="10"
            label="Account Name"
            required
            id="name"
            type="name"
            class="form-control"
            name="name"
            value
            autofocus
            v-model="form.name"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
         
            :rules="emailRules"
            label="Email"
            id="email"
            type="email"
            class="form-control"
            name="email"
            value
            required
            autofocus
            v-model="form.email"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :counter="16"
            label="Password"
            required
            
            id="password"
            type="password"
            class="form-control"
            name="password"
            v-model="form.password"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
        <div class="col-sm-8 form-group offset-sm-11">
                  <v-btn color="green" large type="submit">Register</v-btn>
        </div>
      </v-row>
    </v-container>
  </v-form>
 -->


  <div class="container"  style="">
    <div class="row justify-content-center">
      <div class="col-md-3 offset-sm-4">
        <div class="card text-left">
          
          <div style="margin-top:200px; margin-left:60px; " class=" card-body">
            <div id="headline"  class="pl-4 pb-1 mb-1 display-1 font-weight-bold card-header">
              <h6> Register new account</h6>
              </div>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="name" style="margin-left:60px;" class="mt-1 col-sm-1 col-form-label text-left">Name</label>

                <div style="margin:0 0 0 20px;" class="mt-1 col-md-2 form">
                  <input
                    style=" text-decoration: underline"
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" style="margin-left:60px;" class="col-sm-1 col-form-label text-left">Email</label>

                <div style="margin:0 0 0 20px;" class="col-md-2 form">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label id="pass_label" for="password"  class="col-sm-1 col-form-label text-left">Pass</label>

                <div style="margin:0 0 0 20px;" class="col-sm-2 form">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="ml-5 form-group row mb-3">
                <div class="col-md-4 offset-6">
                  <v-btn color="green" style="color:white;" small type="submit">Register</v-btn>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>


</v-container>







  
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
    // show1:false,
        rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 6 || 'Min 6 characters',
            emailMatch: () => ('The email and password you entered don\'t match'),
        },

      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null
      
    };
  },
  methods: {


    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            .then(() => {
              alert('You have been registered')
            });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  
      // async submit() {
      //   try {
      //     var {
      //       user
      //     } = await firebase
      //       .auth()
      //       .createUserWithEmailAndPassword(this.email, this.password);
      //     // signout
      //     firebase
      //       .auth()
      //       .signOut()
      //       .then(user => {
      //         this.$router.push("/login");
      //       });
      //   } catch (error) {
      //     console.log(error.message);
      //   }
      // }
  }
};
</script>

<style lang="scss" scoped>
.card-body {   
    background-color: #eeeeee;
    border-style: solid;
    border-radius: 5px;
    border-width: 3px;
}
#headline {
  margin-top: 40px;
  margin-left: 42px;
}
#name {
  background-color: white!important;
  height: 30px;
  width: auto;
  border-radius: 3px;
}
#email {
  background-color: white!important;
  height: 30px;
  width: auto;
  border-radius: 3px;
}
#password {
  background-color: white!important;
  height: 30px;
  width: auto;
  border-radius: 3px;
}
#pass_label {
  margin-left:60px;
}

</style>