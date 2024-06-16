import { rounding } from "../../scripts/utils.js";

describe('test suite: formatCurrency', () => {
    it('converts cents to dollars', () => {
        expect(rounding(2095)).toEqual('20.95');
    });

    it('works with zero', () => {
        expect(rounding(0)).toEqual('0.00');
    });

    it('rounds up to nearest', () => {
        expect(rounding(2000.5)).toEqual('20.01');
    });
}); 