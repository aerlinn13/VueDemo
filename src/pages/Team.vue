<template>
<div class="team">

  <img :src="getLogoUrl(team)" v-bind:alt="team" class="team-logo" />

  <div class="team-name">
    {{ team.name }}
  </div>

  <div class="chuck" v-if="players">
    <p class="players-name">Players</p>
    <div v-for="player in players" class="players-link">
      <a v-on:click="openPlayer(player)">
    {{ player.name }}
  </a>
    </div>
  </div>

  <div class="empty-state" v-if="!players">
    <br/><br/> {{ $t('team.noPlayers') }}
    <br/>
  </div>

  <div class="games" v-if="games">
    <p class="games-name">Games</p>
    <div class="add-game">
      <input type="text" placeholder="Date"></input>
      <select>
        <option>{{ team.name }}</option>
    </select>
      <input type="text" placeholder="Goals"></input>
      <select>
        <option v-for="team in teams">
          {{ team.name }}
        </option>
      </select>
      <input type="text" placeholder="Goals"></input>
    </div>
    <button v-on:click="postGame(newGame)">Submit new game</button>

    <div v-for="game in games">
      <div class="games-wrapper">
        <div class="games-team-one">
          <div class="name">
            {{ teams[game.team_one_id].name }}
          </div>
          <div class="goals">
            {{ game.team_one_goals }}
          </div>
        </div>
        <p class="games-separator">:</p>
      <div class="games-team-two">
        <div class="name">
          {{ teams[game.team_two_id].name }}
        </div>
        <div class="goals">
          {{ game.team_two_goals }}
        </div>
      </div>
    </div>
  </div>
</div>

  <div class="empty-state" v-if="!games">
    <br/><br/> {{ $t('team.noGames') }}
    <br/>
  </div>

</div>
</template>

<script>
import mixin from '@/mixins'

export default {
  name: 'Team',
  mixins: [mixin],
  data() {
    return {
      newGame: {
        date: null,
        team_one_id: team.id,
        team_two_id: null,
        team_one_goals: 0,
        team_two_goals: 0,
      }
    }
  },
  computed: {
    team() {
      return this.$store.getters.teams.find(team => team.id == this.$route.params.id)
    },
    teams() {
      let obj = {};
      const array = this.$store.getters.teams;
      array.forEach(function(team) {
        obj[team.id] = team;
      })
      return obj
    },
    games() {
      return this.$store.getters.games
    },
    players() {
      return this.$store.getters.players.filter(player => player.team_id == this.$route.params.id)
    }
  },
  methods: {
    getTeams: function() {
      this.$store.dispatch('getTeams')
    },
    getGames: function() {
      this.$store.dispatch('getGames')
    },
    getPlayers: function() {
      this.$store.dispatch('getPlayers')
    },
    postGame: function(newGame) {
      this.$store.dispatch('postGame', this.newGame)
    },
    openPlayer(player) {
      console.log(player.name);
      console.log(player.id);
      this.$router.push({
        path: `/player/${player.id}`
      })
    },
    getLogoUrl(team) {
      return team.logo_url;
    }
  },
}
</script>

<style lang="scss" scoped>
.team-link {
    display: block;
    height: 60px;
    width: 100%;
    color: #222222;
    &:hover {
        color: #00b8a3;
    }
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

.team {
    text-align: center;
    margin-top: 100px;
    padding: 0 15px;
    width: 100%;

    &-logo {
        height: 70px;
        margin-bottom: 10px;
    }

    &-name {
        font-style: italic;
        font-size: 36px;
    }
}

.players {
    text-align: center;
    width: 100%;

    &-name {
        font-style: italic;
        font-size: 24px;
        height: 30px;
    }

    &-link {
        font-size: 18px;
        margin-bottom: 14px;
        cursor: pointer;
        color: #222222;
        &:hover {
            color: #00b8a3;
        }
    }
}

.games {
    text-align: center;
    margin-top: 50px;
    width: 100%;

    &-name {
        font-style: italic;
        font-size: 24px;
    }

    &-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
    }

    &-separator {
      margin: 10px 30px;
    }

    &-team-one,
    &-team-two {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}

input {
  display: block;
  margin: 0px auto 20px auto;
}
</style>
