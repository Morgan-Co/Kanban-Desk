export type Column = {
	id: number,
	title: string
} 

export type Task ={
	id: number,
	columnId: number
	initialContent: string
	content: string
	details: string
}