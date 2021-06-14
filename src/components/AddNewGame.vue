<template>
  <div class="container">
    <b-form @submit.prevent="onAddGame" @reset.prevent="onReset">
      <b-form-group
        id="input-group-game-date"
        label-cols-sm="3"
        label="Game Date:"
        label-for="GameDate"
        placeholder="2021-12-01"
      >
        <b-form-input
          id="GameDate"
          v-model="$v.form.GameDate.$modal"
          type="text"
          :state="validateState('GameDate')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.GameDate.required">
          Game Date is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-game-time"
        label-cols-sm="3"
        label="Game Time:"
        label-for="GameTime"
      >
        <b-form-input
          id="GameTime"
          v-model="$v.form.GameTime.$modal"
          type="text"
          :state="validateState('GameTime')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.GameTime.required">
          Game Time is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-home-team"
        label-cols-sm="3"
        label="Host Team:"
        label-for="HomeTeam"
      >
        <b-form-input
          id="HomeTeam"
          v-model="$v.form.HomeTeam.$modal"
          type="text"
          :state="validateState('HomeTeam')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.HomeTeam.required">
          Host Team is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-away-team"
        label-cols-sm="3"
        label="Guest Team:"
        label-for="AwayTeam"
      >
        <b-form-input
          id="AwayTeam"
          v-model="$v.form.AwayTeam.$modal"
          type="text"
          :state="validateState('AwayTeam')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.AwayTeam.required">
          Guest Team is required
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
          v-model="$v.form.field.$modal"
          type="text"
          :state="validateState('field')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.field.required">
          Field is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-referee"
        label-cols-sm="3"
        label="Referee:"
        label-for="referee"
      >
        <b-form-input
          id="referee"
          v-model="$v.form.referee.$modal"
          type="text"
          :state="validateState('referee')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.referee.required">
          Referee is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.referee.alpha">
            Referee alpha
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
  </div>
</template>

<script>
import {
  required,
  alpha,
} from "vuelidate/lib/validators";

export default {
  name: "AddGame",
  data() {
    return {
      form: {
        GameDate: "",
        GameTime: "",
        HomeTeam: "",
        AwayTeam: "",
        field: "",
        referee: "",
        submitError: undefined
      },
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      GameDate: {
        required,
      },
      GameTime: {
        required,
      },
      HomeTeam: {
        required,
      },
      AwayTeam: {
        required
      },
      field: {
        required,
      },
      referee: {
        required,
        alpha
      },
    }
  },
  mounted() {
    // console.log("mounted");
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async AddGame() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/games/addGame",
          {
            game_date: this.form.GameDate,
            game_time: this.form.GameTime,
            hometeam: this.form.HomeTeam,
            awayteam: this.form.AwayTeam,
            feild: this.form.feild,
            referee: this.form.referee
          }
        );
        this.$router.push("/");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.$root.toast("Add New Games", error.response.data, "warning");
        this.form.submitError = err.response.data.message;
      }
    },
    onAddGame() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.AddGame();
    },
    onReset() {
      this.form = {
        GameDate: "",
        GameTime: "",
        HomeTeam: "",
        AwayTeam: "",
        field: "",
        referee: "",
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
