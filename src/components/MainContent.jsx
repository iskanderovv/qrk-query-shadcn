import { EllipsisVertical } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { toast } from "sonner";
import { useAddProductMutation, useDeleteProductMutation, useGetAllProductsQuery, useGetProductsQuery, useUpdateProductMutation } from "@/redux/api/product-api";

const PAGE_LIMIT = 10;

export default function MainContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editProduct, setEditProduct] = useState(null);
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [deleteProduct, { isLoading: deleteProductLoading }] = useDeleteProductMutation();
  const [updateProduct, { isLoading: updateProductLoading }] = useUpdateProductMutation();
  const [addProduct, { isLoading: addProductLoading }] = useAddProductMutation();
  const { data: productData, isLoading: productLoading, refetch } = useGetProductsQuery({ page: currentPage, limit: PAGE_LIMIT });
  const { data: allProductData } = useGetAllProductsQuery();
  const [paginationLoading, setPaginationLoading] = useState(false);

  const handleAddProduct = async () => {
    if (!productTitle || !productPrice || productImages.length === 0) {
      console.error('Title, Price, and at least one image are required');
      return;
    }

    const newProduct = {
      title: productTitle,
      price: parseFloat(productPrice),
      description: productDescription,
      categoryId: productCategoryId,
      images: productImages,
    };

    try {
      const response = await addProduct(newProduct).unwrap();
      console.log('Product added successfully:', response);
      setProductTitle('');
      setProductPrice('');
      setProductDescription('');
      setProductCategoryId('');
      setProductImages([]);
      toast.success("Product added successfully", {
        description: getCurrentDateTime(),
        duration: 3000,
        position: 'top-right',
      });
      refetch();
    } catch (error) {
      console.error('Failed to add product:', error);
      toast.error("Failed to add product", {
        description: getCurrentDateTime(),
        position: 'top-right',
      });
    }
  };

  const getCurrentDateTime = () => {
    const date = new Date();
    return date.toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric', hour12: true
    });
  };

  useEffect(() => {
    if (productData) {
      setTotalPages(Math.ceil(allProductData?.length / PAGE_LIMIT));
    }
  }, [productData]);

  const handleDeleteProduct = async (id) => {
    try {
      setPaginationLoading(true);
      await deleteProduct(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to delete product:', error);
    } finally {
      setPaginationLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (editProduct) {
      try {
        setPaginationLoading(true);
        await updateProduct({ id: editProduct.id, productData: { title: productTitle, price: productPrice } }).unwrap();
        refetch();
        setEditProduct(null);
      } catch (error) {
        console.error('Failed to update product:', error);
      } finally {
        setPaginationLoading(false);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setPaginationLoading(true);
    setCurrentPage(pageNumber);
    refetch().finally(() => setPaginationLoading(false));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handleLastPage = () => {
    handlePageChange(totalPages);
  };

  return (
    <div className="m-8 shadow-bxshadow rounded-md py-7 px-6 relative">
      {productLoading || paginationLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
          <SyncLoader />
        </div>
      ) : null}
      <div className='flex justify-between mb-4'>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Products <Badge>{allProductData?.length || 0}</Badge>
        </h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="">Add Product</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add Product</AlertDialogTitle>
              <AlertDialogDescription>
                Add a new product to the list.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className='flex gap-3 flex-col'>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
            <div className='flex gap-3 flex-col'>
              <Label htmlFor="price">Price</Label>
              <Input
                type="text"
                id="price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <div className='flex gap-3 flex-col'>
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                id="description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            <div className='flex gap-3 flex-col'>
              <Label htmlFor="categoryId">Category ID</Label>
              <Input
                type="text"
                id="categoryId"
                value={productCategoryId}
                onChange={(e) => setProductCategoryId(e.target.value)}
                placeholder="Category ID"
              />
            </div>
            <div className='flex gap-3 flex-col'>
              <Label htmlFor="images">Images</Label>
              <Input
                type="text"
                id="images"
                value={productImages.join(', ')}
                onChange={(e) => setProductImages(e.target.value.split(',').map(img => img.trim()))}
                placeholder="Images"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleAddProduct}
                disabled={addProductLoading}
              >
                {addProductLoading ? 'Adding...' : 'Add Product'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productData?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.categoryId}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setEditProduct(product);
                        setProductTitle(product.title);
                        setProductPrice(product.price.toString());
                        setProductCategoryId(product.categoryId);
                        setProductDescription(product.description || '');
                        setProductImages(product.images || []);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-500"
                      disabled={deleteProductLoading}
                    >
                      {deleteProductLoading ? 'Deleting...' : 'Delete'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className='my-4'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>

          {currentPage > 2 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={handleFirstPage}
              >
                1
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

          {[...Array(Math.min(3, totalPages))].map((_, index) => {
            const pageNumber = currentPage - 1 + index;
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            return null;
          })}

          {currentPage < totalPages - 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={handleLastPage}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {editProduct && (
        <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Update the details of the product.
              </DialogDescription>
            </DialogHeader>
            <div className='flex gap-3 flex-col'>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                type="text"
                id="edit-title"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
            <div className='flex gap-3 flex-col'>
              <Label htmlFor="edit-price">Price</Label>
              <Input
                type="text"
                id="edit-price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <div className='flex gap-3 flex-col'>
              <Label htmlFor="edit-description">Description</Label>
              <Input
                type="text"
                id="edit-description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            <div className='flex gap-3 flex-col'>
              <Label htmlFor="edit-categoryId">Category ID</Label>
              <Input
                type="text"
                id="edit-categoryId"
                value={productCategoryId}
                onChange={(e) => setProductCategoryId(e.target.value)}
                placeholder="Category ID"
              />
            </div>
            <div className='flex gap-3 flex-col'>
              <Label htmlFor="edit-images">Images</Label>
              <Input
                type="text"
                id="edit-images"
                value={productImages.join(', ')}
                onChange={(e) => setProductImages(e.target.value.split(',').map(img => img.trim()))}
                placeholder="Images"
              />
            </div>
            <Button
              onClick={handleUpdateProduct}
              disabled={updateProductLoading}
            >
              {updateProductLoading ? 'Updating...' : 'Update Product'}
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
