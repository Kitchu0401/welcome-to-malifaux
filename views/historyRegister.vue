<template>

  <main role="main" class="flex-shrink-0">
    <div class="container">
      <div class="py-5 text-center">
        <h1 class="mt-5">Report Registration</h1>
        <p class="lead">Let`s talk about what happened!</p>
      </div>
      <div class="row">
        <!-- requester -->
        <div class="col-md-6">
          <h4 class="mb-3">Apostle of Justice</h4>
          <div class="mb-3">
            <label for="requester-faction">Faction</label>
            <select class="custom-select d-block w-100" id="requester-faction" v-model="requester.faction">
              <option value=""></option>
              <option v-for="(v, i) in faction" v-bind:key="i">{{ v }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="requester-master">Master</label>
            <select class="custom-select d-block w-100" id="requester-master" v-model="requester.master">
              <option value=""></option>
              <option v-for="(v, i) in master[this.requester.faction]" v-bind:key="i">{{ v }}</option>
            </select>
          </div>
          <div class="row mb-3">
            <div class="col-md-9 col-sm-7">
              <label for="requester-strategy">Strategy</label>
              <select class="custom-select d-block w-100" id="requester-strategy" v-model="requester.strategy.name">
                <option value=""></option>
                <option v-for="(v, i) in strategy" v-bind:key="i">{{ v }}</option>
              </select>
            </div>
            <div class="col-md-3 col-sm-5">
              <label for="requester-scheme-score-1">Score</label>
              <select class="custom-select d-block w-100" id="requester-scheme-score-1" v-model.number="requester.strategy.score">
                <option v-for="(v, i) in [0, 1, 2, 3, 4]" v-bind:key="i">{{ v }}</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-9 col-sm-7">
              <label for="requester-scheme-1">Scheme-1</label>
              <select class="custom-select d-block w-100" id="requester-scheme-1" v-model="requester.scheme[0].name">
                <option value=""></option>
                <option v-for="(v, i) in scheme" v-bind:key="i">{{ v }}</option>
              </select>
            </div>
            <div class="col-md-3 col-sm-5">
              <label for="requester-scheme-score-1">Score</label>
              <select class="custom-select d-block w-100" id="requester-scheme-score-1" v-model.number="requester.scheme[0].score">
                <option v-for="(v, i) in [0, 1, 2, 3]" v-bind:key="i">{{ v }}</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-9 col-sm-7">
              <label for="requester-scheme-2">Scheme-2</label>
              <select class="custom-select d-block w-100" id="requester-scheme-2" v-model="requester.scheme[1].name">
                <option value=""></option>
                <option v-for="(v, i) in scheme" v-bind:key="i">{{ v }}</option>
              </select>
            </div>
            <div class="col-md-3 col-sm-5">
              <label for="requester-scheme-score-2">Score</label>
              <select class="custom-select d-block w-100" id="requester-scheme-score-2" v-model.number="requester.scheme[1].score">
                <option v-for="(v, i) in [0, 1, 2, 3]" v-bind:key="i">{{ v }}</option>
              </select>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <h6>Total score</h6>
            <span v-text="requseter_total_score"></span>
          </div>
        </div>
        <!-- opponent -->
        <div class="col-md-6">
          <h4 class="mb-3">Axis of Evil</h4>
          <div class="mb-3">
            <label for="opponent-faction">Faction</label>
            <select class="custom-select d-block w-100" id="opponent-faction" v-model="opponent.faction">
              <option value=""></option>
              <option v-for="(v, i) in faction" v-bind:key="i">{{ v }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="opponent-master">Master</label>
            <select class="custom-select d-block w-100" id="opponent-master" v-model="opponent.master">
              <option value=""></option>
              <option v-for="(v, i) in master[this.opponent.faction]" v-bind:key="i">{{ v }}</option>
            </select>
          </div>
          <div class="row mb-3">
            <div class="col-md-9 col-sm-7">
              <label for="opponent-strategy">Strategy</label>
              <select class="custom-select d-block w-100" id="opponent-strategy" v-model="opponent.strategy.name">
                <option value=""></option>
                <option v-for="(v, i) in strategy" v-bind:key="i">{{ v }}</option>
              </select>
            </div>
            <div class="col-md-3 col-sm-5">
              <label for="opponent-scheme-score-1">Score</label>
              <select class="custom-select d-block w-100" id="opponent-scheme-score-1" v-model.number="opponent.strategy.score">
                <option v-for="(v, i) in [0, 1, 2, 3, 4]" v-bind:key="i">{{ v }}</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-9 col-sm-7">
              <label for="opponent-scheme-1">Scheme-1</label>
              <select class="custom-select d-block w-100" id="opponent-scheme-1" v-model="opponent.scheme[0].name">
                <option value=""></option>
                <option v-for="(v, i) in scheme" v-bind:key="i">{{ v }}</option>
              </select>
            </div>
            <div class="col-md-3 col-sm-5">
              <label for="opponent-scheme-score-1">Score</label>
              <select class="custom-select d-block w-100" id="opponent-scheme-score-1" v-model.number="opponent.scheme[0].score">
                <option v-for="(v, i) in [0, 1, 2, 3]" v-bind:key="i">{{ v }}</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-9 col-sm-7">
              <label for="opponent-scheme-2">Scheme-2</label>
              <select class="custom-select d-block w-100" id="opponent-scheme-2" v-model="opponent.scheme[1].name">
                <option value=""></option>
                <option v-for="(v, i) in scheme" v-bind:key="i">{{ v }}</option>
              </select>
            </div>
            <div class="col-md-3 col-sm-5">
              <label for="opponent-scheme-score-2">Score</label>
              <select class="custom-select d-block w-100" id="opponent-scheme-score-2" v-model.number="opponent.scheme[1].score">
                <option v-for="(v, i) in [0, 1, 2, 3]" v-bind:key="i">{{ v }}</option>
              </select>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <h6>Total score</h6>
            <span v-text="opponent_total_score"></span>
          </div>
        </div>
      </div>

      <hr class="mb-4">
      
      <button class="btn btn-primary btn-lg btn-block" type="submit" v-on:click="sendRegisterRequest">Submit</button>
    </div>
  </main>

</template>

<script>
const faction = [
  'The Guild',
  'Resurrectionists',
  'Neverborn',
  'Arcanists',
  'Outcasts',
  'Ten Thunders',
  'Gremlins'
]

const master = {
  'The Guild': [
    'Sonnia Criid',
    'Lady Justice',
    'Perdita Ortega',
    'C. Hoffman',
    'McMourning',
    'McCabe',
    'Lucius',
    'Nellie Cochrane'
  ],
  'Resurrectionists': [
    'Seamus',
    'Molly',
    'Nicodem',
    'Kirai',
    'McMourning',
    'Tara',
    'Yan Lo',
    'Reva'
  ],
  'Neverborn': [
    'Lilith',
    'Pandora',
    'Dreamer & Chompy',
    'Collodi',
    'Zoraida',
    'Lucius',
    'Jakob Lynch',
    'Titania'
  ],
  'Arcanists': [
    'Ramos',
    'Rasputina',
    'Colette',
    'Marcus',
    'Ironsides',
    'Kaeris',
    'Mei Feng',
    'Sandeep Desai'
  ],
  'Outcasts': [
    'Viktorias',
    'Jack Daw',
    'Leveticus',
    'Hamelin',
    'Von Schill',
    'Tara',
    'Misaki',
    'Parker Barrows'
  ],
  'Ten Thunders': [
    'Shenlong',
    'Misaki',
    'Mei Feng',
    'McCabe',
    'Yan Lo',
    'Brewmaster',
    'Jakob Lynch',
    'Asami Tanaka'
  ],
  'Gremlins': [
    'Som\'er Teeth Jones',
    'Ophelia',
    'Mah Tucket',
    'Ulix',
    'Wong',
    'Brewmaster',
    'Zoraida',
    'Zipp'
  ]
}

const strategy = {
  'Wave II': [
    '[R] Ply for Information',
    '[C] Ours',
    '[M] Symbol of Authority',
    '[T] Public Executions',
    '[J] Supply Wagons'
  ]
}

const scheme = {
  'Wave II': [
    '[R] Surround Them',
    '[C] Guarded Treasure',
    '[M] Punish the Weak',
    '[T] Eliminate the Leadership',
    '[1] Covert Breakthrough',
    '[2] Dig Their Graves',
    '[3] Set Up',
    '[4] Hold Up Their Forces',
    '[5] Undercover Entourage',
    '[6] Inescapable Trap',
    '[7] Show of Force',
    '[8] Search the Ruins',
    '[9] Take Prisoner',
    '[10] Take One For the Team',
    '[11] Recover Evidence',
    '[12] Vendetta',
    '[13] Public Demonstration'
  ]
}

module.exports = {
  name: 'HistoryRegister',
  components: {},
  props: {},
  data: function () {
    return {
      // static data
      faction: faction,
      master: master,
      strategy: strategy['Wave II'],
      scheme: scheme['Wave II'],
      // user ids
      requesterId: '',
      opponentId: '',
      // form data
      requester: {
        faction: '',
        master: '',
        strategy: { name: '', score: 0 },
        scheme: [
          { name: '', score: 0 },
          { name: '', score: 0 }
        ],
        total_score: 0
      },
      opponent: {
        faction: '',
        master: '',
        strategy: { name: '', score: 0 },
        scheme: [
          { name: '', score: 0 },
          { name: '', score: 0 }
        ],
        total_score: 0
      }
    }
  },
  computed: {
    requseter_total_score: function () {
      return Number(this.requester.strategy.score)
        + Number(this.requester.scheme[0].score)
        + Number(this.requester.scheme[1].score)
    },
    opponent_total_score: function () {
      return Number(this.opponent.strategy.score)
        + Number(this.opponent.scheme[0].score)
        + Number(this.opponent.scheme[1].score)
    }
  },
  methods: {
    sendRegisterRequest: function() {
      this.requester.total_score = this.requseter_total_score
      this.opponent.total_score = this.opponent_total_score

      let body = {
        requesterId: this.requesterId,
        opponentId: this.opponentId,
        requester: this.requester,
        opponent: this.opponent
      }
      
      console.log('Sending body params:', body)

      axios.post('/api/history/register', body)
        .then(console.log)
        .catch(console.error)
    }
  }
}
</script>

<style scoped>

</style>
