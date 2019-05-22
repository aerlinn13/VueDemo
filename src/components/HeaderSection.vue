<template>
  <header class="header">
    <div class="header__sticky">
      <div class="header__nav">
      </div>
      <div class="header__content">
        <router-link to="/" class="home-link">
        UEFA Champions League
        </router-link>
      </div>
      <div class="header__nav pointer">
        <div class="header__search">
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      showSearchBlock: false,
      keyword: ''
    }
  },
  computed: {
  },
  methods: {
    toggleSidebar: function() {
      this.$emit('toggleSidebar')
    },
    changeLanguage: function(locale) {
      this.$i18n.locale = locale
    }
  }
}
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}

.header {

  &__sticky {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    display: table;
    margin: 0;
    height: 60px;
    background: #00b8a3;
    text-align: center;
    color: #fff;
    width: 100%;
  }

  &__content {
    text-align: center;
    display: table-cell;
    vertical-align: middle;
  }
  &__brand {
    width: auto;
    height: 50px;
  }
  &__nav {
    color: #fff;
    display: table-cell;
    vertical-align: middle;

    &:first-child {
      text-align: left;
      padding-left: 15px;
      width: 50px;
    }
    &:last-child {
      text-align: right;
      padding-right: 15px;
      width: 50px;
    }
  }

  &__hamburger {
    background: none;
    border: none;
    padding: 0;
    outline: none;
    color: #fff;
    font-size: 30px;
  }
  &__search {
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      width: 20px;
      height: 20px;
    }
  }
  .home-link {
    color: white;
    font-size: 14px;
    text-decoration: none;
  }
}
</style>
