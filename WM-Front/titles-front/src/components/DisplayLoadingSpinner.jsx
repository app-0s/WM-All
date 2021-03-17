import React from 'react'
import {Spinner} from 'reactstrap';

export const loading = (
    <div style={{display: 'flex', justifyContent: 'center'}} >
        <Spinner type="grow" >
            Loading...
        </Spinner>
    </div>
)