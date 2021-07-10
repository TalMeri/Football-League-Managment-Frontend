<template>
  <div class="event-info">
    <ul class="event-content">
      <li> <b>Minute:</b> {{ minute }}</li>
      <li> <b>Event:</b> {{ event }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "EventInfo",
  props: {
    minute: {
        type: Number,
        required: true
    },
    event: {
        type: String,
        required: true
    }
  }, 
  mounted(){
    console.log("event info mounted")
  } 
};
</script>

<style>

</style>
