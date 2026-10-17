"use client"

import { useMemo, useState, useEffect } from "react"
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSort } from "@/components/shared/use-table-sort"
import { SortableHead } from "@/components/shared/sortable-head"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CategoryForm } from "./category-form"
import { fetchAllCategories, deleteCategory } from "../_actions/categories"
import { friendlyError } from "@/lib/messages"
import toast from "react-hot-toast"
import type { Category } from "@/lib/types"

const ITEMS_PER_PAGE = 10

export function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)
  const [page, setPage] = useState(1)

  const accessors = useMemo(
    () => ({
      name: (c: Category) => c.name ?? "",
      description: (c: Category) => c.description ?? "",
    }),
    []
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return categories
    return categories.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q)
    )
  }, [categories, search])

  const { sorted, sort, toggleSort } = useSort(filtered, accessors)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    // Filtering changes the row count, so jump back to a page that exists.
    setPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paged = sorted.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)

  // Sorting resets to the first page so the user never lands on an empty one.
  const sortProps = {
    activeColumn: sort.column,
    direction: sort.direction,
    onToggle: (column: string) => setPage(toggleSort(column)),
  }

  const loadCategories = async () => {
    try {
      const res = await fetchAllCategories()
      if (res.success) {
        setCategories(res.data as Category[])
      } else {
        setError(friendlyError(res.message, "Please login to manage categories"))
        toast.error(friendlyError(res.message, "Please login to manage categories"))
      }
    } catch {
      setError("Failed to fetch categories")
      toast.error("Failed to fetch categories")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetchAllCategories()
        if (!cancelled) {
          if (res.success) {
            setCategories(res.data as Category[])
          } else {
            setError(friendlyError(res.message, "Please login to manage categories"))
            toast.error(friendlyError(res.message, "Please login to manage categories"))
          }
        }
      } catch {
        if (!cancelled) {
          setError("Failed to fetch categories")
          toast.error("Failed to fetch categories")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    const res = await deleteCategory(deleteTarget.id)
    if (res.success) {
      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id))
      toast.success("Category deleted!")
    } else {
      toast.error(friendlyError(res.message, "Please login to manage categories"))
    }
    setDeleteTarget(null)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingCategory(null)
    setDialogOpen(true)
  }

  const handleSuccess = () => {
    setDialogOpen(false)
    setEditingCategory(null)
    loadCategories()
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />
        <div className="h-96 animate-pulse rounded-xl border border-border bg-card" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Categories</h2>
          <p className="text-sm text-muted-foreground">
            Manage gear categories across the platform
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="size-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Category" : "Create Category"}</DialogTitle>
            </DialogHeader>
            <CategoryForm
              key={editingCategory?.id || "new"}
              category={editingCategory}
              onSuccess={handleSuccess}
              onCancel={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <Table className="min-w-[500px]">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <SortableHead label="Name" column="name" {...sortProps} />
              <SortableHead label="Description" column="description" {...sortProps} />
              <TableHead>Image</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-muted-foreground">{category.description || "N/A"}</TableCell>
                <TableCell className="text-muted-foreground">
                  {category.image ? (
                    <a href={category.image} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => handleEdit(category)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive"
                      onClick={() => setDeleteTarget(category)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {categories.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No categories yet. Use Add Category to create the first one.
          </div>
        )}
        {categories.length > 0 && filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No categories match &ldquo;{search}&rdquo;.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(safePage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(safePage * ITEMS_PER_PAGE, sorted.length)} of {sorted.length} categories
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={safePage === 1}
              onClick={() => setPage(safePage - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {safePage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={safePage === totalPages}
              onClick={() => setPage(safePage + 1)}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <Trash2 />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete this category?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the category. Categories that still have gear assigned
              cannot be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
