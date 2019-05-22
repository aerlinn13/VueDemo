<template>
<div class="player">

<img :src="getFlagUrl(player)" v-bind:alt="player" class="player-flag"/>

<div class="player-name">
{{ player.name }}
</div>

<div v-if="player.history.length">
<p class="history-name">Team History</p>
<div v-for="team in player.history" class="teams-link">
<a v-on:click="openTeam(team)">
  {{ teams[team.team_id].name }}
  <div class="teams-details">
  <div class="teams-goals">Goals: {{ team.goals }}   </div>
  <div class="teams-apps">Appearances: {{ team.apps }}</div>
  </div>
</a>

</div>
  </div>

<div class="empty-state" v-if="!player.history.length">
  <br/><br/>
  {{ $t('player.noHistory') }}
  <br/>
</div>

</div>
</template>

<script>
import mixin from '@/mixins'

export default {
  name: 'Player',
  mixins: [mixin],
  data () {
    return {
    }
  },
  computed: {
    player () {
    return this.$store.getters.players.find(player => player.id == this.$route.params.id)
    },
    teams () {
      let obj = {};
      const array = this.$store.getters.teams;
      array.forEach(function (team) {
        obj[team.id] = team;
      })
      return obj
    }
  },
  methods: {
    getTeams: function () {
      this.$store.dispatch('getTeams')
    },
    getPlayers: function () {
      this.$store.dispatch('getPlayers')
    },
    openTeam (team) {
      this.$router.push({ path: `/team/${team.id}` })
    },
    getFlagUrl(player) {
    return player.flag_url;
    }
  },
  mounted () {
    this.$store.commit('setTabActive', 'random')
  }
}

</script>

<style lang="scss" scoped>

.teams {
  &-details {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  &-goals, &-apps {
    margin-right: 10px;
    font-size: 18px;
  }
}
.teams-link {
  display: block;
  width: 100%;
  cursor: pointer;
  color: #222222;
  font-style: italic;
  font-size: 24px;
  margin-bottom: 10px;
  &:hover {
    color: #00b8a3;
  }
}

.history-name {
  display: block;
  width: 100%;
  font-size: 24px;
  margin-bottom: 10px;
}

.empty-state {
  text-align: center;
  font-size: 24px;
  margin-top: 100px;
  color: #ccc;

  .icon {
    font-size: 48px;
  }
}

.player {
  text-align: center;
  margin-top: 100px;
  padding: 0 15px;

  &-flag {
    height: 70px;
    margin-bottom: 10px;
  }
  &-name {
    font-style: italic;
    font-size: 36px;
  }
}
</style>
