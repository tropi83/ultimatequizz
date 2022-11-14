
// -----------------------------------------------------------------------------------------------------
// @ Theme
// -----------------------------------------------------------------------------------------------------
export class Theme
{
    id: string;
    name: string;

    /**
     * Constructor
     */
    constructor(
        id,
        name
    )
    {
        this.id = id || null;
        this.name = name || null;
    }
}
