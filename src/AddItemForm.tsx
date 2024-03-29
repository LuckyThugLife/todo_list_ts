import React, {ChangeEvent, KeyboardEvent, useMemo, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm is called")

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)


    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null){
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (

        <div>
            <TextField variant={"outlined"}
                       value={title}
                       label={"Type value"}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}/>

            <IconButton onClick={addItem} color={"primary"}>
                <ControlPoint/>
            </IconButton>


        </div>
    )
})


export default AddItemForm