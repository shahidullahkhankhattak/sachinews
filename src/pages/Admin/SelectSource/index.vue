<template>
  <q-page>
    <div class="p-pa-md main-container q-mt-sm">
      <div class="row">
        <!-- breadcrumb [START] -->
        <div class="col-12">
          <div class="q-pa-sm">
            <q-card class="main-card" flat bordered>
              <q-card-section>
                <q-breadcrumbs class="text-purple" active-color="blue">
                  <template v-slot:separator>
                    <q-icon size="1.2em" name="arrow_forward" color="purple" />
                  </template>
                  <q-breadcrumbs-el to="/admin" label="Home" icon="home" />
                  <q-breadcrumbs-el to="/admin/sources" label="sources" />
                </q-breadcrumbs>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <!-- breadcrumb [END] -->

        <!-- add card [START] -->
        <div class="col-12">
          <div class="q-pa-sm">
            <q-card class="main-card" flat bordered>
              <q-card-section>
                  <q-card-section class="q-pt-xs col-xs-12">
                    <div class="text-overline">Select Source</div>
                    <div class="text-h5 q-mt-sm q-mb-xs">Select Source & Redirect</div>
                    <div class="text-caption text-grey-8">
                      Please select a source below and click on Go to proceed
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <q-form @submit="next()">
                      <div class="row q-col-gutter-md">
                        <div class="col-md-4">
                          <SelectGroup
                            v-model="selected"
                            label="Sources"
                            :rules="[rules.REQUIRED]"
                            option-label="name"
                            option-value="_id"
                            empty-msg="No Sources Found"
                            :options="options"
                            icon="home"
                          />
                        </div>
                        <div class="col-md-12">
                          <q-btn type="submit" outline color="green" size="16px">
                            <q-icon name="check"></q-icon>
                            <div class="q-ml-xs text-center">Go</div>
                          </q-btn>
                        </div>
                      </div>
                    </q-form>
                  </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <!-- add card [END] -->
      </div>
    </div>
    <!-- main container [END] -->
  </q-page>
</template>
<script>
import { validations } from '../../../validators';
import { actions, getters } from './handleStore';
import SelectGroup from '../../../components/Select/SelectGroup';

export default {
  components: {
    SelectGroup,
  },
  data() {
    return {
      redirect: '',
      selected: '',
      rules: { ...validations },
    };
  },
  watch: {
    $route() {
      this.redirect = this.$route.query.next;
    },
  },
  computed: {
    ...getters,
    options() {
      let index = 0;
      const groupHash = {};
      const groups = [];
      (this.list || []).forEach((value) => {
        if (groupHash[value.lang.name] || groupHash[value.lang.name] === 0) {
          groups[groupHash[value.lang.name]].children.push(value);
        } else {
          groupHash[value.lang.name] = index;
          groups[index] = {
            label: value.lang.name,
            children: [value],
          };
          index += 1;
        }
      });
      return groups;
    },
  },
  methods: {
    ...actions,
    next() {
      this.$router.push(`${this.redirect}/${this.selected}`);
    },
  },
  beforeMount() {
    this.fetch();
  },
  mounted() {
    this.redirect = this.$route.query.next;
  },
};
</script>
