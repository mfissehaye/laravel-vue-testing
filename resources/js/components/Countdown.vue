<template>
  <div>
    <div v-if="remaining > 0">
      <span>{{ remaining.days() }} Days, </span>
      <span>{{ remaining.hours() }} Hours, </span>
      <span>{{ remaining.minutes() }} Minutes, </span>
      <span>{{ remaining.seconds() }} Seconds, </span>
      left ...
    </div>

    <div v-else>{{ expiredText }}</div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    until: null,
    expiredText: { default: "Now Expired" },
  },

  data() {
    return { now: new Date() };
  },

  computed: {
    remaining() {
      const remaining = moment.duration(Date.parse(this.until) - this.now);

      if (remaining <= 0) this.$emit("finished");

      return remaining;
      //   return {
      //     total: remaining,
      //     days: remaining.days(),
      //     hours: remaining.hours(),
      //     minutes: remaining.minutes(),
      //     seconds: remaining.seconds(),
      //   };
    },
  },

  created() {
    const interval = setInterval(() => {
      this.now = new Date();
    }, 1000);

    this.$on("finished", () => clearInterval(interval));
  },
};
</script>