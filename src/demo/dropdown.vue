<template lang="pug">
.dropdown-demo
  page-header(
    :history="history",
    title="Dropdown",
  )

  nav.navbar.navbar-expand-lg.navbar-light.bg-light
    ul.navbar-nav
      dropdown(
        align="right",
        tag-name="li",
        :label="'Welcome, ' + currentUser.email",
      )
        router-link.dropdown-item(:to="{name: 'home'}") Logout

        .dropdown-divider
        p.mb-0.px-4.text-muted
          small Last login:
          br
          small.pl-3 {{currentUser.lastLoginIp}}
          br
          small.pl-3 {{currentUser.lastLoginTime}}
</template>

<script>
import Dropdown from '@/dropdown';
import component from '@/demo/component';

export default {
  components: {
    Dropdown,
  },
  mixins: [component],

  data() {
    return {
      currentUser: {
        email: 'meathill@openresty.com',
        lastLoginIp: '1.2.3.4',
        lastLoginTime: '2020-03-03',
      },
    };
  },
};
</script>
