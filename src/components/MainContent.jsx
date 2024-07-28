import { useState } from 'react';
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
import { useGetProductsQuery } from "@/redux/api/product-api";
import { Button } from './ui/button';

export default function MainContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const { data: productData, isLoading: productLoading } = useGetProductsQuery({
    page: currentPage,
    limit: productsPerPage,
  });

  const totalPages = productData?.length || 1;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  console.log(`Current Page: ${currentPage}, Total Pages: ${totalPages}`);

  return (
    <div className="m-8 shadow-bxshadow rounded-md py-7 px-6">
      <div className='flex justify-between'>
        <h2 className="text-2xl font-bold">Products</h2>
        <Button className="flex items-center gap-1 my-4">
          <span className='text-2xl font-normal'>+</span>
          <span>Qo'shish</span>
        </Button>
      </div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Edit</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productData?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell className="text-right">${product.price}</TableCell>
              <TableCell className="text-right">${product.price}</TableCell>
              <TableCell className="text-right">${product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              ${productData?.reduce((total, product) => total + product.price, 0).toFixed(2)}
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
