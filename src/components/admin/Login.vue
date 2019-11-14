<template>
    <v-container style="max-width:700px; margin-top:150px;">
        <v-row>
            <v-col id="head" offset-md="3" md="6" xs="12">
                <h1 class="display-1" >
                    Administrator login
                </h1>
                <div id="info" cl>

                     <v-text-field
                        v-model="email"
                        label="Email"
                        required
                    >
                    </v-text-field>
                    <v-text-field
                       v-model="password"
                        :append-icon="show1 ? 'visibility' : 'visibility_off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 6 characters"
                        counter
                        @click:append="show1 = !show1"
                                >
                    </v-text-field>
                    
                     <v-btn
                     small
                     class="mt-1"
                    color="green"
                    style="color:white;"
                    @click.prevent="signIn()"
                    >
                        Login
                    </v-btn>

                    <!-- <v-btn
                    class="mt-2" style="margin:0 0 0 10px; color:white;"
                    color="incomplete"
                    @click.prevent="signOut()"
                    >
                        Sign Out
                    </v-btn> -->
                
                </div>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'

    export default {
        
        data() {
            return {
                email: '',
                password: '',
                show1:false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 6 || 'Min 6 characters',
                    emailMatch: () => ('The email and password you entered don\'t match'),
                }
                
            }
        },
        methods: {
            signIn() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
                    this.$router.replace('/admin')
                })
                .catch(function(error){
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert ("wrong password")
                    }
                    else {
                        alert (errorMessage)
                    }
                    console.log(error)
                })
            },
            signOut() {
                firebase.auth().signOut().then(() => {
                    alert('Logged Out')
                    this.$router.replace('/')
                }).catch(error => {
                    alert(error)
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
 #info {
     padding: 20px;
 }
 #head h1{
    border-style: none!important;
    font-family: 'Big Shoulders Text'!important;
 }
</style>