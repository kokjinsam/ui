import * as React from "react"
import { useDragAndDrop, type Selection } from "react-aria-components"
import { useAsyncList, useListData } from "react-stately"
import { Loader } from "../loader"
import { Table } from "../table"

const books = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publishedYear: 1960
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publishedYear: 1949
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    publishedYear: 1925
  },
  {
    id: "4",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    publishedYear: 1951
  },
  {
    id: "5",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publishedYear: 1813
  },
  {
    id: "6",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publishedYear: 1954
  },
  {
    id: "7",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    publishedYear: 1997
  }
]

const BulkActions = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set())

  return (
    <div className="flex h-full items-center">
      <Table
        aria-label="Books"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <Table.Header>
          <Table.Column className="max-w-0">#</Table.Column>
          <Table.Column isRowHeader>Title</Table.Column>
          <Table.Column>Author</Table.Column>
          <Table.Column>Genre</Table.Column>
          <Table.Column>Published</Table.Column>
        </Table.Header>
        <Table.Body items={books}>
          {(item) => (
            <Table.Row>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {item.title}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {item.author}
              </Table.Cell>
              <Table.Cell>{item.genre}</Table.Cell>
              <Table.Cell>{item.publishedYear}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const Resizable = () => (
  <div className="flex h-full items-center">
    <Table allowResize aria-label="Vocalists">
      <Table.Header>
        <Table.Column className="max-w-0">#</Table.Column>
        <Table.Column isRowHeader isResizable>
          Title
        </Table.Column>
        <Table.Column>Author</Table.Column>
        <Table.Column isResizable>Genre</Table.Column>
        <Table.Column>Published</Table.Column>
      </Table.Header>
      <Table.Body items={books}>
        {(item) => (
          <Table.Row id={item.id}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell className="whitespace-nowrap">{item.title}</Table.Cell>
            <Table.Cell className="whitespace-nowrap">{item.author}</Table.Cell>
            <Table.Cell>{item.genre}</Table.Cell>
            <Table.Cell>{item.publishedYear}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)

const DragAndDrop = () => {
  const list = useListData({
    initialItems: books
  })

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        "text/plain": list.getItem(key)?.id ?? ""
      })),
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys)
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys)
      }
    }
  })

  return (
    <div className="flex h-full items-center">
      <Table aria-label="Movies" dragAndDropHooks={dragAndDropHooks}>
        <Table.Header>
          <Table.Column>#</Table.Column>
          <Table.Column isRowHeader>Title</Table.Column>
          <Table.Column>Author</Table.Column>
          <Table.Column>Genre</Table.Column>
          <Table.Column>Published</Table.Column>
        </Table.Header>
        <Table.Body items={list.items}>
          {(item) => (
            <Table.Row>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.author}</Table.Cell>
              <Table.Cell>{item.genre}</Table.Cell>
              <Table.Cell>{item.publishedYear}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

type Character = {
  episode_id: string
  title: string
  director: number
  producer: number
  release_date: number
}

const Sorting = () => {
  const list = useAsyncList<Character>({
    async load({ signal }) {
      const res = await fetch("https://swapi.py4e.com/api/films", {
        signal
      })
      const json = await res.json()
      return {
        items: json.results
      }
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          // @ts-ignore
          const first = a[sortDescriptor.column]
          // @ts-ignore
          const second = b[sortDescriptor.column]
          let cmp =
            (Number.parseInt(first) || first) <
            (Number.parseInt(second) || second)
              ? -1
              : 1
          if (sortDescriptor.direction === "descending") {
            cmp *= -1
          }
          return cmp
        })
      }
    }
  })

  return (
    <div className="flex h-full items-center">
      <Table
        aria-label="Movies"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <Table.Header>
          <Table.Column id="title" isRowHeader>
            Title
          </Table.Column>
          <Table.Column id="director" allowsSorting>
            Director
          </Table.Column>
          <Table.Column id="producer">Producer</Table.Column>
          <Table.Column id="release_date" allowsSorting>
            Release Date
          </Table.Column>
        </Table.Header>
        <Table.Body
          items={list.items}
          renderEmptyState={() => (
            <div className="grid place-content-center p-10">
              <Loader />
            </div>
          )}
        >
          {(item) => (
            <Table.Row id={item.title}>
              <Table.Cell className="whitespace-nowrap">
                {item.title}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {item.director}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {item.producer}
              </Table.Cell>
              <Table.Cell>{item.release_date}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const AllCombined = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set())

  const list = useAsyncList<Character>({
    getKey(item) {
      return item.episode_id
    },
    async load({ signal }) {
      const res = await fetch("https://swapi.py4e.com/api/films", {
        signal
      })
      const json = await res.json()
      return {
        items: json.results
      }
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          // @ts-ignore
          const first = a[sortDescriptor.column]
          // @ts-ignore
          const second = b[sortDescriptor.column]
          let cmp =
            (Number.parseInt(first) || first) <
            (Number.parseInt(second) || second)
              ? -1
              : 1
          if (sortDescriptor.direction === "descending") {
            cmp *= -1
          }
          return cmp
        })
      }
    }
  })

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        "text/plain": list.getItem(key)?.episode_id ?? ""
      })),
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys)
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys)
      }
    }
  })

  return (
    <div className="flex h-full items-center">
      <Table
        allowResize
        aria-label="Movies"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        dragAndDropHooks={dragAndDropHooks}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <Table.Header>
          <Table.Column id="episode_id" className="max-w-0">
            ID
          </Table.Column>
          <Table.Column id="title" isRowHeader isResizable>
            Title
          </Table.Column>
          <Table.Column id="director" allowsSorting isResizable>
            Director
          </Table.Column>
          <Table.Column id="producer" isResizable>
            Producer
          </Table.Column>
          <Table.Column id="release_date" allowsSorting>
            Release Date
          </Table.Column>
        </Table.Header>
        <Table.Body
          items={list.items}
          renderEmptyState={() => (
            <div className="grid place-content-center p-10">
              <Loader />
            </div>
          )}
        >
          {(item) => (
            <Table.Row id={item.episode_id}>
              <Table.Cell>{item.episode_id}</Table.Cell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.director}</Table.Cell>
              <Table.Cell>{item.producer}</Table.Cell>
              <Table.Cell>{item.release_date}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

export default { BulkActions, Resizable, DragAndDrop, Sorting, AllCombined }
