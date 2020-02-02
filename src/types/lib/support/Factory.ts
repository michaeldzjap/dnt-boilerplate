interface Factory<T> {
    /**
     * Create a new instance.
     *
     * @returns {*}
     */
    make(): T;
}

export default Factory;
