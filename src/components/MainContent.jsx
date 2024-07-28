import { EllipsisVertical } from 'lucide-react';
import { useState, useEffect } from 'react';
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
import { useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from "@/redux/api/product-api";

const PAGE_LIMIT = 10;

export default function MainContent() {
  const [currentPage, setCurrentPage] = useState(7);
  const [totalPages, setTotalPages] = useState(1);
  const [editProduct, setEditProduct] = useState(null);
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [deleteProduct, { isLoading: deleteProductLoading }] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data: productData, isLoading: productLoading, refetch } = useGetProductsQuery({ page: currentPage, limit: PAGE_LIMIT });
  const [addProduct, { isLoading: addProductLoading }] = useAddProductMutation();

  const [productDescription, setProductDescription] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [productImages, setProductImages] = useState('');

  const handleAddProduct = async () => {
    if (!productTitle || !productPrice) {
      console.error('Title and Price are required');
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
      setProductImages('');
      refetch();
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };
  

  useEffect(() => {
    if (productData) {
      setTotalPages(Math.ceil(productData.total / PAGE_LIMIT));
    }
  }, [productData]);

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    refetch();
  };

  const handleUpdateProduct = async () => {
    if (editProduct) {
      await updateProduct({ id: editProduct.id, productData: { title: productTitle, price: productPrice } });
      refetch();
      setEditProduct(null);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      refetch();
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      refetch();
    }
  };

  return (
    <div className="m-8 shadow-bxshadow rounded-md py-7 px-6">
      <div className='flex justify-between'>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Products <Badge>{productData?.length || 0}</Badge>
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
                value={productImages}
                onChange={(e) => setProductImages(e.target.value)}
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
        <TableCaption>Recently added products</TableCaption>
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
          {productLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">Loading...</TableCell>
            </TableRow>
          ) : (
            productData?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='outline-none text-2xl'>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="flex flex-col gap-y-1 p-2 px-4 py-4 justify-start items-start">
                      <DropdownMenuItem asChild>
                        <Dialog open={!!editProduct}>
                          <DialogTrigger asChild>
                            <button className="w-full text-left text-green-500" onClick={() => {
                              setEditProduct(product);
                              setProductTitle(product.title);
                              setProductPrice(product.price);
                            }}>Edit</button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription>
                                Make changes to the product details below.
                              </DialogDescription>
                            </DialogHeader>
                            <div className='flex gap-10 flex-col'>
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
                              <Button
                                className="w-full"
                                onClick={handleUpdateProduct}
                              >
                                Save Changes
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="w-full text-left text-red-500">Delete</button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your product.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProduct(product.id)}
                                disabled={deleteProductLoading}
                              >
                                {deleteProductLoading ? 'Deleting...' : 'Delete'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell colSpan={1} className="text-right">
              $200
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="flex justify-end">
        <div className="flex justify-between items-center gap-4 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
