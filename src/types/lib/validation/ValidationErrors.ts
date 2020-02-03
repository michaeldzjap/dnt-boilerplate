interface ValidationErrors {
    /**
     * A validation error for a specific field.
     *
     * @var {ValidationError}
     */
    [field: string]: { message: string; value: string };
}

export default ValidationErrors;
