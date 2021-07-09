<template>
  <div class="container">
    <h1 class="title">Add New Game</h1>
    <b-form @submit.prevent="onAddGame" @reset.prevent="onReset">
      <b-form-group
        id="input-group-gamedate"
        label-cols-sm="3"
        label="Game Date:"
        label-for="gamedate"
      >
        <b-form-input
          id="gamedate"
          v-model="$v.form.gamedate.$model"
          type="text"
          :state="validateState('gamedate')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.gamedate.required">
          Game date is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-gametime"
        label-cols-sm="3"
        label="Game Time:"
        label-for="gametime"
      >
        <b-form-input
          id="gametime"
          v-model="$v.form.gametime.$model"
          type="text"
          :state="validateState('gametime')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.gametime.required">
          First name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-hometeam"
        label-cols-sm="3"
        label="Host Team:"
        label-for="hometeam"
      >
        <b-form-input
          id="hometeam"
          v-model="$v.form.hometeam.$model"
          type="text"
          :state="validateState('hometeam')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.hometeam.required">
          Host team is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-awayteam"
        label-cols-sm="3"
        label="Guest Team:"
        label-for="awayteam"
      >
        <b-form-input
          id="awayteam"
          v-model="$v.form.awayteam.$model"
          type="text"
          :state="validateState('awayteam')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.awayteam.required">
          Guest team is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-field"
        label-cols-sm="3"
        label="Field:"
        label-for="field"
      >
        <b-form-input
          id="field"
          v-model="$v.form.field.$model"
          type="text"
          :state="validateState('field')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.field.required">
          field is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-referee"
        label-cols-sm="3"
        label="Referee:"
        label-for="referee"
      >
        <b-form-input
          id="field"
          v-model="$v.form.referee.$model"
          type="text"
          :state="validateState('referee')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.referee.required">
          Referee is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Add Game</b-button
      >
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Add Game failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import {
  required,
} from "vuelidate/lib/validators";

export default {
  name: "AddNewGame",
  data() {
    return {
      form: {
        gamedate: "",
        gametime: "",
        hometeam:"",
        awayteam:"",
        field:"",
        referee:"",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      gamedate: {
        required
      },
      gametime: {
        required
      },
      hometeam: {
        required
      },
      awayteam:{
        required
      },
      field:{
        required
      },
      referee:{
        required,
      }
    }
  },
  mounted() {
    // console.log("mounted");
    //this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          "http://localhost:3000/games/addGame",
          {
            game_date: this.form.gamedate,
            game_time: this.form.gametime,
            hometeam: this.form.hometeam,
            awayteam: this.form.awayteam,
            feild: this.form.field,
            referee: this.form.referee,
          }
        );
        this.axios.defaults.withCredentials = false;
        this.$router.push("/league");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.$root.toast("Add New Game", err.response.data, "warning");
        }
    },
    onAddGame() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        gamedate: "",
        gametime: "",
        hometeam:"",
        awayteam:"",
        field:"",
        referee:""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>