import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  Text,
  useColorModeValue,
  useToast,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [upatedProduct, setUpdatedProduct] = useState(product);

  const { deleteProduct, updateProduct } = useProductStore();

  const toast = useToast();
  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "Error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleUpdateProduct = async (id, upatedProduct) => {
    onClose();
    const { success, message } = await updateProduct(id, upatedProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        isClosable: true,
        status: "error",
      });
    }else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
  };
  return (
    <Box
      // maxW={"sm"}
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={60}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme={"blue"}
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalBody>
            <VStack>
              <Input
                placeholder="Product Name"
                name="name"
                value={upatedProduct.name}
                onChange={(e) => {
                  setUpdatedProduct({ ...upatedProduct, name: e.target.value });
                }}
              />
              <Input
                placeholder="Product Price"
                name="price"
                type="number"
                value={upatedProduct.price}
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updateProduct,
                    price: e.target.value,
                  });
                }}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={upatedProduct.image}
                onChange={(e) => {
                  setUpdatedProduct({
                    ...upatedProduct,
                    image: e.target.value,
                  });
                }}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handleUpdateProduct(product._id, upatedProduct);
              }}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose} >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
