<template>
  <div>

    <div v-if="teams">
    <div class="teams-header">Teams</div>
      <div v-for="team in teams" class="teams-link">
        <a v-on:click="openTeam(team)">
          {{ team.name }}
        </a>
    </div>
  </div>

    <div class="empty-state" v-if="!teams">
      <br/><br/>
      {{ $t('home.noTeams') }}
      <br/>
    </div>

  </div>
</template>

<script>
import mixin from '@/mixins'

export default {
  name: 'HomePage',
  mixins: [mixin],
  data () {
    return {
    }
  },
  computed: {
    teams () {
      return this.$store.getters.teams
    }
  },
  methods: {
    getTeams: function () {
      this.$store.dispatch('getTeams')
    },
    getGames: function () {
      this.$store.dispatch('getGames')
    },
    getPlayers: function () {
      this.$store.dispatch('getPlayers')
    },
    openTeam: function (team) {
    console.log(team.name);
    console.log(team.id);
    this.$router.push({ path: `/team/${team.id}` })
    }
  },
  mounted () {
    this.$store.commit('setTabActive', 'random')
    this.getTeams()
    this.getGames()
    this.getPlayers()
  }
}

</script>

<style lang="scss" scoped>

.teams-header{
  text-align: center;
  font-size: 36px;
  margin: 100px auto 50px auto;
}

.teams-link{
  display: block;
  height: 60px;
  width: 100%;
  cursor: pointer;
  text-align: center;
  font-size: 24px;
  color: #222222;
  &:hover {
    color: #00b8a3;
  }
}


.empty-state{
  text-align: center;
  font-size: 24px;
  margin-top: 100px;
  color: #ccc;

  .icon{
    font-size: 48px;
  }
}

</style>
