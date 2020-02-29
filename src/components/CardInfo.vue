<template>
  <v-col cols="6" md="3">
    <v-card>
      <v-card-text class="d-flex justify-space-between white--text info-color" :style="cssVars">
        <div>
          <div class="text-value-lg">{{num}}</div>
          <div>{{msg}}</div>
        </div>
        <v-icon size="64" color="white">{{icon}}</v-icon>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ["theme", "theme2", "msg", "num", "icon"],
  computed: {
    cssVars() {
      return {
        "--bg-color": this.theme,
        "--bg-color2": this.theme2 ?? this.theme
      };
    }
  }
};
</script>


<style lang="scss" scoped>
.info-color {
  background: var(--bg-color) !important;
  background: linear-gradient(
    45deg,
    var(--bg-color),
    var(--bg-color2)
  ) !important;
  border-color: var(--bg-color) !important;
}

.text-value-lg {
  font-size: 1.3125rem;
}
</style>
