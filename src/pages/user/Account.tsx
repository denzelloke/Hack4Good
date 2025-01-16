import { useState, useEffect } from 'react';
import { getUser, getVoucher, getProduct } from '../../backend/database';
import { User, Voucher, Product } from '../../types';
import { Container, Box } from '@mantine/core';
import { ProfileCard } from '../../components/accountComponents/ProfileCard';
import { VoucherFilter } from '../../components/accountComponents/VoucherFilter';
import { VoucherCard } from '../../components/accountComponents/VoucherCard';

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>('ALL');

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedUser] = await getUser();
      setUser(fetchedUser);

      const allVouchers = await getVoucher();
      setVouchers(allVouchers.sort((a, b) => b.created_at - a.created_at));

      const allProducts = await getProduct();
      setProducts(allProducts);
    };

    fetchData();
  }, []);

  const isExpired = (expiredAt: number) => Date.now() >= expiredAt;

  const filteredVouchers = vouchers.filter((voucher) => {
    if (filter === 'VALID') return !voucher.is_claimed && !isExpired(voucher.expired_at);
    if (filter === 'CLAIMED') return voucher.is_claimed;
    if (filter === 'EXPIRED') return isExpired(voucher.expired_at);
    return true;
  });

  if (!user) {
    return <Box>Loading...</Box>;
  }

  return (
    <Container size="sm" mt="lg">
      
      <ProfileCard user={user} />

      
      
      <VoucherFilter filter={filter} setFilter={setFilter} />
      
      <Box mt="lg">
        {filteredVouchers.map((voucher) => {
          const product = products.find((prod) => prod.id === String(voucher.product_id));
          return (
            <VoucherCard
              key={voucher.id}
              voucher={voucher}
              product={product}
              isExpired={isExpired}
            />
          );
        })}
      </Box>

    </Container>
  );
}
