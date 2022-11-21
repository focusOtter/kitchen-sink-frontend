import { GraphQLResult } from '@aws-amplify/api-graphql'
import { Flex, Heading, View } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { listProducts } from '../src/graphql/queries'

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

function Home() {
	const [products, setProducts] = useState<IProduct[] | []>([])

	useEffect(() => {
		let publicProductsWithURL: IProduct[] = []
		const productData = API.graphql({
			query: listProducts,
			authMode: 'AWS_IAM',
		}) as Promise<GraphQLResult>

		productData.then((data) => {
			const res = data.data?.listProducts as IFetchedProduct[]
			const liveProducts = res.filter((product) => product.isLive)
			for (const liveProduct of liveProducts) {
				// Assign url to be public cloudfront
				const displayURL = `https://d1aiv8f5ptrlie.cloudfront.net/${liveProduct.imgKey}`

				publicProductsWithURL.push({
					...liveProduct,
					imgURL: displayURL,
				})
			}
			console.log('the res', res)

			setProducts(publicProductsWithURL)
		})
	}, [])

	return (
		<View>
			<Heading level={2}>Kitchen Sink Store</Heading>
			<Flex wrap={'wrap'}>
				{products.map((product) => {
					return <ProductCard key={product.id} product={product} />
				})}
			</Flex>
		</View>
	)
}

export default Home
