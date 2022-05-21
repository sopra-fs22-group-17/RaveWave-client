export interface IDeferred<T> {
    // notify(state?: any): void;
    promise: Promise<T>;

    resolve(value?: T): void;

    reject(reason?: any): void;
}

type resolveFn<T> = (value?: T | PromiseLike<T>) => void;

type rejectFn = (reason?: any) => void;

/**
 * Thanks to Miguel Molina (mvader)
 *
 * @see https://github.com/mvader/es6-defer/blob/master/src/defer.js
 */
export function defer<T>(): IDeferred<T> {
    let _resolve: resolveFn<T>, _reject: rejectFn;
    const promise = new Promise((resolve: resolveFn<T>, reject: rejectFn) => {
        _resolve = resolve;
        _reject = reject;
    });

    return Object.freeze(
        Object.create(
            {},
            {
                resolve: {
                    value: _resolve,
                    enumerable: true,
                },
                reject: {
                    value: _reject,
                    enumerable: true,
                },
                promise: {
                    value: promise,
                    enumerable: true,
                },
            },
        ),
    );
}
