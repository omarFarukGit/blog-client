'use client'

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const RegisterFrom = () => {
    return (
        <form className='space-y-4'>
            <Card className=' p-5 space-y-4'>
                <Input name='email' type='email' placeholder='Enter your Email' required></Input>
                <Input name='password' type='password' placeholder='Enter your password' required></Input>
                <Button type='submit'>
                    Register
                </Button>
            </Card>
        </form>
    );
};

export default RegisterFrom;