/* eslint-disable */
import * as React from 'react'
import { fetchByPath, validateField } from './utils'
import { getOverrideProps } from '@aws-amplify/ui-react/internal'
import {
	Button,
	Divider,
	Flex,
	Grid,
	Heading,
	SwitchField,
	TextField,
} from '@aws-amplify/ui-react'
export default function MyForm(props) {
	const { onSubmit, onCancel, onValidate, onChange, overrides, ...rest } = props
	const initialValues = {
		name: undefined,
		description: undefined,
		price: undefined,
		productImage: undefined,
		isLive: false,
	}
	const [name, setName] = React.useState(initialValues.name)
	const [description, setDescription] = React.useState(
		initialValues.description
	)
	const [price, setPrice] = React.useState(initialValues.price)
	const [productImage, setProductImage] = React.useState(
		initialValues.productImage
	)
	const [isLive, setIsLive] = React.useState(initialValues.isLive)
	const [errors, setErrors] = React.useState({})
	const resetStateValues = () => {
		setName(initialValues.name)
		setDescription(initialValues.description)
		setPrice(initialValues.price)
		setProductImage(initialValues.productImage)
		setIsLive(initialValues.isLive)
		setErrors({})
	}
	const validations = {
		name: [{ type: 'Required' }],
		description: [{ type: 'Required' }],
		price: [{ type: 'Required' }],
		productImage: [],
		isLive: [{ type: 'Required' }],
	}
	const runValidationTasks = async (fieldName, value) => {
		let validationResponse = validateField(value, validations[fieldName])
		const customValidator = fetchByPath(onValidate, fieldName)
		if (customValidator) {
			validationResponse = await customValidator(value, validationResponse)
		}
		setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }))
		return validationResponse
	}
	return (
		<Grid
			as="form"
			rowGap="15px"
			columnGap="15px"
			padding="20px"
			onSubmit={async (event) => {
				event.preventDefault()
				const modelFields = {
					name,
					description,
					price,
					productImage,
					isLive,
				}
				const validationResponses = await Promise.all(
					Object.keys(validations).reduce((promises, fieldName) => {
						if (Array.isArray(modelFields[fieldName])) {
							promises.push(
								...modelFields[fieldName].map((item) =>
									runValidationTasks(fieldName, item)
								)
							)
							return promises
						}
						promises.push(runValidationTasks(fieldName, modelFields[fieldName]))
						return promises
					}, [])
				)
				if (validationResponses.some((r) => r.hasError)) {
					return
				}
				await onSubmit(modelFields)
			}}
			{...rest}
			{...getOverrideProps(overrides, 'MyForm')}
		>
			<Heading
				level={2}
				children="Create Product Form"
				{...getOverrideProps(overrides, 'SectionalElement0')}
			></Heading>
			<TextField
				label="Name"
				isRequired={true}
				onChange={(e) => {
					let { value } = e.target
					if (onChange) {
						const modelFields = {
							name: value,
							description,
							price,
							productImage,
							isLive,
						}
						const result = onChange(modelFields)
						value = result?.name ?? value
					}
					if (errors.name?.hasError) {
						runValidationTasks('name', value)
					}
					setName(value)
				}}
				onBlur={() => runValidationTasks('name', name)}
				errorMessage={errors.name?.errorMessage}
				hasError={errors.name?.hasError}
				{...getOverrideProps(overrides, 'name')}
			></TextField>
			<TextField
				label="Description"
				isRequired={true}
				onChange={(e) => {
					let { value } = e.target
					if (onChange) {
						const modelFields = {
							name,
							description: value,
							price,
							productImage,
							isLive,
						}
						const result = onChange(modelFields)
						value = result?.description ?? value
					}
					if (errors.description?.hasError) {
						runValidationTasks('description', value)
					}
					setDescription(value)
				}}
				onBlur={() => runValidationTasks('description', description)}
				errorMessage={errors.description?.errorMessage}
				hasError={errors.description?.hasError}
				{...getOverrideProps(overrides, 'description')}
			></TextField>
			<TextField
				label="Price"
				isRequired={true}
				placeholder="2.00"
				type="number"
				step="any"
				onChange={(e) => {
					let { value } = e.target
					if (onChange) {
						const modelFields = {
							name,
							description,
							price: value,
							productImage,
							isLive,
						}
						const result = onChange(modelFields)
						value = result?.price ?? value
					}
					if (errors.price?.hasError) {
						runValidationTasks('price', value)
					}
					setPrice(value)
				}}
				onBlur={() => runValidationTasks('price', price)}
				errorMessage={errors.price?.errorMessage}
				hasError={errors.price?.hasError}
				{...getOverrideProps(overrides, 'price')}
			></TextField>
			<TextField
				label="Product Image"
				onChange={(e) => {
					let value = e.target.files[0]
					if (onChange) {
						const modelFields = {
							name,
							description,
							price,
							productImage: value,
							isLive,
						}
						const result = onChange(modelFields)
						value = result?.productImage ?? value
					}
					if (errors.productImage?.hasError) {
						runValidationTasks('productImage', value)
					}
					setProductImage(value)
				}}
				onBlur={() => runValidationTasks('productImage', productImage)}
				errorMessage={errors.productImage?.errorMessage}
				hasError={errors.productImage?.hasError}
				{...getOverrideProps(overrides, 'productImage')}
			></TextField>
			<Divider
				orientation="horizontal"
				{...getOverrideProps(overrides, 'SectionalElement1')}
			></Divider>
			<SwitchField
				label="make available now"
				defaultChecked={false}
				isChecked={isLive}
				onChange={(e) => {
					let value = e.target.checked
					if (onChange) {
						const modelFields = {
							name,
							description,
							price,
							productImage,
							isLive: value,
						}
						const result = onChange(modelFields)
						value = result?.isLive ?? value
					}
					if (errors.isLive?.hasError) {
						runValidationTasks('isLive', value)
					}
					setIsLive(value)
				}}
				onBlur={() => runValidationTasks('isLive', isLive)}
				errorMessage={errors.isLive?.errorMessage}
				hasError={errors.isLive?.hasError}
				{...getOverrideProps(overrides, 'isLive')}
			></SwitchField>
			<Flex
				justifyContent="space-between"
				{...getOverrideProps(overrides, 'CTAFlex')}
			>
				<Button
					children="Clear"
					type="reset"
					onClick={resetStateValues}
					{...getOverrideProps(overrides, 'ClearButton')}
				></Button>
				<Flex {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
					<Button
						children="Cancel"
						type="button"
						onClick={() => {
							onCancel && onCancel()
						}}
						{...getOverrideProps(overrides, 'CancelButton')}
					></Button>
					<Button
						children="Create"
						type="submit"
						variation="primary"
						isDisabled={Object.values(errors).some((e) => e?.hasError)}
						{...getOverrideProps(overrides, 'SubmitButton')}
					></Button>
				</Flex>
			</Flex>
		</Grid>
	)
}
