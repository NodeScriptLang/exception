import assert from 'assert';

import { Exception } from '../main/index.js';

describe('Exception', () => {

    describe('custom class', () => {

        class AccessDeniedError extends Exception<{ reason: string }> {
            status = 403;
        }

        it('derives the name from class', () => {
            const err = new AccessDeniedError('You are not allowed here');
            assert.strictEqual(err.name, 'AccessDeniedError');
        });

        it('supports custom status code', () => {
            const err = new AccessDeniedError('You are not allowed here');
            assert.strictEqual(err.status, 403);
        });

        it('supports custom details', () => {
            const err = new AccessDeniedError('You are not allowed here', { reason: 'boring' });
            assert.deepStrictEqual(err.details, { reason: 'boring' });
        });

        it('JSON-serializable', () => {
            const err = new AccessDeniedError('You are not allowed here', { reason: 'boring' });
            assert.deepStrictEqual(JSON.parse(JSON.stringify(err)), {
                name: 'AccessDeniedError',
                message: 'You are not allowed here',
                status: 403,
                details: { reason: 'boring' },
            });
        });

    });

    describe('fromJSON', () => {

        it('creates an ad hoc exception at call site', () => {
            const err = Exception.fromJSON({
                name: 'SomethingIsWrong',
                message: 'Something is wrong'
            });
            assert.deepStrictEqual(JSON.parse(JSON.stringify(err)), {
                name: 'SomethingIsWrong',
                message: 'Something is wrong',
            });
        });

    });

});
