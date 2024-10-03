# Project Overview

Use this guide to create a web app where users can use billboards from advertising agencies in their area. A modern web app where users can log in and customers can view billboards, add them to their cart, upload their images, and purchase billboards.

# Requirements

We will use NextJS(14), TailwindCSS, shadcn UI, Supabase for auth and backend and iyzico for payment.

# Tables & Buckets already Created

Supabase storage Bucket: "designs" (user uploaded designs)
Supabase Storage bucket: "billboard-images" (billboard images)

-- Sepet Tablosu
CREATE TABLE carts (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
user_id UUID REFERENCES auth.users(id) NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Sepet Öğeleri Tablosu
CREATE TABLE cart_items (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
cart_id UUID REFERENCES carts(id) NOT NULL,
billboard_id INTEGER REFERENCES billboards(id) NOT NULL,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
design_url TEXT,
created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Siparişler Tablosu
CREATE TABLE orders (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
user_id UUID REFERENCES auth.users(id) NOT NULL,
campaign_name TEXT NOT NULL,
total_amount DECIMAL(10, 2) NOT NULL,
status TEXT NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Sipariş Öğeleri Tablosu
CREATE TABLE order_items (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
order_id UUID REFERENCES orders(id) NOT NULL,
billboard_id INTEGER REFERENCES billboards(id) NOT NULL,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
design_url TEXT NOT NULL,
price DECIMAL(10, 2) NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE
billboard_owners (
id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id UUID REFERENCES auth.users (id),
NAME TEXT NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE
billboard_types (
id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
type_name TEXT NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE
billboards (
id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
owner_id BIGINT REFERENCES billboard_owners (id),
type_id BIGINT REFERENCES billboard_types (id),
title TEXT NOT NULL,
description TEXT,
LOCATION TEXT,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE
billboard_views (
id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
billboard_id BIGINT REFERENCES billboards (id),
user_id UUID REFERENCES auth.users (id),
view_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE
profiles (
id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id UUID REFERENCES auth.users (id),
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE
carts (
id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id UUID REFERENCES auth.users (id),
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE
cart_items (
id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
cart_id BIGINT REFERENCES carts (id),
product_id BIGINT REFERENCES products (id), -- Assuming a products table exists
quantity INTEGER NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE
orders (
id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id UUID REFERENCES auth.users (id),
total_amount NUMERIC NOT NULL,
order_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
status TEXT NOT NULL
);

CREATE TABLE
order_items (
id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
order_id BIGINT REFERENCES orders (id),
product_id BIGINT REFERENCES products (id), -- Assuming a products table exists
quantity INTEGER NOT NULL,
price NUMERIC NOT NULL
);

# Requirements

1. User can login and logout and they can see the billboards
2. User can view billboards
3. User can add billboards to their cart
4. User can view their cart
5. User can remove billboards from their cart
6. User can complete the purchase
7. User can view their orders
8. User can upload the design
9. User can change their personal information
10. User can see the billboard designs
11. Billboards can be filtered by location
12. Billboards can be filtered by type
13. Billboards can be filtered by price
14. Billboards can be filtered by owner
15. Billboard owner can edit their billboard
16. Billboard owner can delete their billboard
17. Billboard owner can see the views of their billboard
18. Billboard owner can see the orders of their billboard
19. Billboard owner can see the revenue of their billboard
20. Billboard owner can see the number of views of their billboard
21. Billboard owner can see the number of orders of their billboard
22. Billboard owner can see the number of revenue of their billboard
23. Billboard owner can see the number of clicks of their billboard
24. Billboard owner can see the number of impressions of their billboard
25. Billboard owner can see the number of conversions of their billboard
26. Billboard owner can see the number of revenue of their billboard
27. Billboard owner can see the number of clicks of their billboard
28. Billboard owner can see the number of impressions of their billboard
29. Billboard owner can see the number of conversions of their billboard
30. Billboard owner can see the number of revenue of their billboard
31. Billboard owner can see the number of clicks of their billboard
32. Billboard owner can see the number of impressions of their billboard
33. After billboard owner upload the billboard users can see the billboards on the reklam-ver page

# Documentations

import {createClient} from '@supabase/supabase-js'

// Create supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// Get user session
const session = supabase.auth.getSession()

// Get user profile
const {data: profile, error} = await supabase.from('profiles').select('\*').eq('id', session.user.id)

// upload file using standart upload
async function uploadFile(file) {
const {data, error} = await supabase.storage.from('designs').upload(file)
return data
}
