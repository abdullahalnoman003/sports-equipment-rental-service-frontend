"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { CategoryForm } from "./category-form"
import { fetchAllCategories, deleteCategory } from "../_actions/categories"
import toast from "react-hot-toast"
import type { Category } from "@/lib/types"

export function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const loadCategories = async () => {
    try {
      const res = await fetchAllCategories()
      if (res.success) {
        setCategories(res.data as Category[])
      } else {
        setError(res.message || "Failed to fetch categories")
        toast.error(res.message || "Failed to fetch categories")
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
            setError(res.message || "Failed to fetch categories")
            toast.error(res.message || "Failed to fetch categories")
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return
    const res = await deleteCategory(id)
    if (res.success) {
      setCategories((prev) => prev.filter((c) => c.id !== id))
      toast.success("Category deleted!")
    } else {
      toast.error(res.message || "Failed to delete category")
    }
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

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <Table className="min-w-[500px]">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-muted-foreground">{category.description || "—"}</TableCell>
                <TableCell className="text-muted-foreground">
                  {category.image ? (
                    <a href={category.image} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      View
                    </a>
                  ) : (
                    "—"
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
                      onClick={() => handleDelete(category.id)}
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
            No categories found.
          </div>
        )}
      </div>
    </div>
  )
}
