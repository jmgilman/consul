import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { get, action } from '@ember/object';

export default class ShowController extends Controller {
  @service('flashMessages') notify;

  @action
  error(e) {
    if (e.target.readyState === 1) {
      // OPEN
      if (get(e, 'error.errors.firstObject.status') === '404') {
        this.notify.add({
          destroyOnClick: false,
          sticky: true,
          type: 'warning',
          action: 'update',
        });
      }
      [e.target, this.proxies].forEach(function(item) {
        if (item && typeof item.close === 'function') {
          item.close();
        }
      });
    }
  }
}
