import { View, withAuthenticator } from '@aws-amplify/ui-react'
import { API, Storage } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { createProduct } from '../src/graphql/mutations'
import { MyForm } from '../ui-components/index'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { listProducts } from '../src/graphql/queries'
import ProductCard from '../components/ProductCard'
import { onProductCreate } from '../src/graphql/subscriptions'

interface IProduct {
	id: string
	name: string
	imgURL: string
	description: string
	price: number
	isLive: boolean
}

interface IFetchedProduct {
	id: string
	name: string
	imgKey: string
	description: string
	price: number
	isLive: boolean
}

type AmplifyFormTypes = {
	name: string
	price: number
	description: string
	productImage: File
	isLive: boolean
}

function Admin() {
	const [draftPosts, setDraftPosts] = useState<IProduct[] | []>([])

	// fetch the current draft posts
	useEffect(() => {
		let draftProductsWithURL: IProduct[] = []
		const productData = API.graphql({
			query: listProducts,
		}) as Promise<GraphQLResult>

		productData.then(async (data) => {
			const res = data.data.listProducts as IFetchedProduct[]
			const draftProducts = res.filter((product) => !product.isLive)
			for (const draftProduct of draftProducts) {
				// Assign url to be public cloudfront
				const signedURL = await Storage.get(draftProduct.imgKey, {
					level: 'private',
				})

				draftProductsWithURL.push({
					...draftProduct,
					imgURL: signedURL,
				})
			}

			console.log(res)
			console.log('the draft posts', draftProductsWithURL)
			setDraftPosts(draftProductsWithURL)
		})
	}, [])

	// subscribe to when a product is created as a draft
	// useEffect(() => {
	// 	const subscription = API.graphql({
	// 		query: onProductCreate,
	// 	}).subscribe({
	// 		next: ({ value }) =>
	// 			setDraftPosts((prevDrafts) => [value.createProduct, ...prevDrafts]),
	// 	})

	// 	return () => subscription.unsubscribe()
	// }, [])

	//create a draft post
	const handleSubmit = async (values: AmplifyFormTypes) => {
		console.log(values)

		const res = await API.graphql({
			query: createProduct,
			variables: {
				input: {
					name: values.name,
					price: values.price * 100, //stored in cents
					description: values.description,
					imgKey: values.productImage.name,
					isLive: values.isLive,
				},
			},
		})

		await Storage.put(values.productImage.name, values.productImage, {
			contentType: values.productImage.type,
			level: values.isLive ? 'public' : 'private',
		})
	}

	return (
		<View>
			<MyForm
				overrides={{
					productImage: {
						type: 'file',
						accept: 'image/*',
					},
				}}
				onSubmit={handleSubmit}
			/>
			{draftPosts.map((draft) => (
				<ProductCard key={draft.name} product={draft} />
			))}
		</View>
	)
}

export default withAuthenticator(Admin, { signUpAttributes: ['email'] })
