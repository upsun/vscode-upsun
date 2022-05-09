import { assert } from 'chai';
import { WebBrowser } from '../../../utils/webbrowser';

suite('WebBrowser Test Suite', () => {

    test('WebBrowser.open', () => {
        try {
            WebBrowser.open('Test : You can close !');

            assert.equal(1, 1);
        } catch (e) {
            assert.fail();
        }
    });

});
