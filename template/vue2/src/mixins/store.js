import { createNamespacedHelpers, mapState, mapActions } from 'vuex';

const shareModule = createNamespacedHelpers('share');
export default {
  computed: {
    ...shareModule.mapState([]),
    ...mapState([]),
  },
  methods: {
    ...shareModule.mapActions([]),
    ...mapActions([]),
  },
};
