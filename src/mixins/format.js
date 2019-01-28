import moment from 'moment';
import capitalize from 'lodash/capitalize';
import isNumber from 'lodash/isNumber';

function fixUnixTime(value) {
  if (isNumber(value)) {
    value = value < 2E9 ? value * 1000 : value;
  }
  return value;
}

export default {
  filters: {
    datetime(value) {
      value = fixUnixTime(value);
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
    fromNow(value) {
      value = fixUnixTime(value);
      return moment(value).fromNow();
    },
    dateTime(value) {
      value = fixUnixTime(value);
      return moment(value).format('lll');
    },
    duration(value) {
      return moment.duration(value);
    },

    capitalize(value) {
      return capitalize(value);
    },
    substring(value, length) {
      return value.substring(0, length);
    },
    upper(value) {
      return value.toUpperCase();
    },

    thousandsSeparator(number) {
      return number && number.toString().replace(/(?=(?!^)(\d{3})+$)/g, ',');
    },

    badgeClass(status) {
      switch (status) {
        case 'created':
          return 'badge-info';

        case 'pending running':
          return 'badge-light';

        case 'running':
          return 'badge-warning';

        case 'finished':
          return 'badge-success';

        case 'errored':
          return 'badge-danger';

        case 'stopped':
        case 'canceled':
          return 'badge-secondary';
      }
    },

    bgClass(status) {
      switch (status) {
        case 'created':
          return 'bg-info text-white';

        case 'running':
          return 'bg-warning text-white';

        case 'finished':
          return 'bg-success text-white';

        case 'errored':
          return 'bg-danger text-white';

        case 'stopped':
          return 'bg-secondary text-white';
      }
    },

    borderClass(status) {
      switch (status) {
        case 'created':
          return 'border-info';

        case 'running':
          return 'border-warning';

        case 'finished':
          return 'border-success';

        case 'errored':
          return 'border-danger';

        case 'stopped':
          return 'border-secondary';
      }
    },

    textClass(status) {
      switch (status) {
        case 'created':
          return 'text-info';

        case 'running':
          return 'text-warning';

        case 'finished':
          return 'text-success';

        case 'errored':
          return 'text-danger';

        case 'stopped':
          return 'text-secondary';
      }
    },
  },
};
