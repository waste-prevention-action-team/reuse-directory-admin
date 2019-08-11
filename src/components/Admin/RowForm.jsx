import React from 'react'
import { List as ImmutableList } from 'immutable'
import PropTypes from 'prop-types'

import {
    Button,
    Checkbox,
    Input,
    Select,
    Table
} from '../../semantic'

const InputField = ({
    type,
    extraProps,
    value,
    onChange
}) => {
    const v = value || ''
    switch (type) {
        case 'select':
            return <Select
                {...extraProps}
                search
                value={v}
                onChange={(e, fieldProps) => onChange(fieldProps.value)}
            />
        case 'checkbox':
            return <Checkbox
                checked={value === 'y'}
                onChange={(e, fieldProps) => onChange(fieldProps.checked ? 'y' : '')}
            />
        case 'textarea':
            return <textarea
                value={v}
                onChange={(e) => onChange(e.target.value)}
            />
        case 'hidden':
            return <input type="hidden" value={v} />
        default:
            return <Input
                value={v}
                onChange={(e, fieldProps) => onChange(fieldProps.value)}
            />
    }
}

InputField.propTypes = {
    type: PropTypes.string,
    extraProps: PropTypes.shape({}),
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

InputField.defaultProps = {
    type: null,
    extraProps: {},
    value: null
}

const prepareData = (columns, columnsInputTypes, data) => data.map((cellValue, idx) => {
    const columnProps = columnsInputTypes[columns.get(idx)]
    if (columnProps && columnProps.formula) {
        return columnProps.formula
    }
    return cellValue
})

const RowForm = ({
    columns,
    initialData,
    columnsInputTypes,
    handleAdd,
    handleUpdate,
    handleDelete
}) => {
    const [data, updateData] = React.useState(initialData)
    return (
        <Table.Row>
            <Table.Cell>
                {data.get(0)}
            </Table.Cell>
            {data.slice(1).map((cellValue, idx) => (
                <Table.Cell key={columns.get(idx + 1)}>
                    <InputField
                        {...columnsInputTypes[columns.get(idx + 1)]}
                        value={cellValue}
                        onChange={(value) => { updateData(data.splice(idx + 1, 1, value)) }}
                    />
                </Table.Cell>
            ))}
            <Table.Cell>
                {data.get(0) ?
                    <>
                        <Button
                            content="Update"
                            primary
                            onClick={() => handleUpdate(prepareData(columns, columnsInputTypes, data))}
                        />
                        <Button content="Delete" negative onClick={() => handleDelete(data.get(0))} />
                    </> :
                    <Button
                        content="Add"
                        primary
                        onClick={() => {
                            handleAdd(prepareData(columns, columnsInputTypes, data), () => { updateData(initialData) })
                        }}
                    />}
            </Table.Cell>
        </Table.Row>
    )
}

RowForm.propTypes = {
    columns: PropTypes.instanceOf(ImmutableList).isRequired,
    initialData: PropTypes.instanceOf(ImmutableList).isRequired,
    columnsInputTypes: PropTypes.shape({}),
    handleAdd: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}

RowForm.defaultProps = {
    columnsInputTypes: {}
}

export default RowForm
