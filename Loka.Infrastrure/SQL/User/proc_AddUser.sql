select * from Users
select * from Roles
go
--
if(exists(select * from sys.objects where name = 'proc_AddUser'))
drop proc proc_AddUser
go
create proc proc_AddUser 
	@FullName nvarchar(max),
	@Email nvarchar(max),
	@Phone nvarchar(max),
	@RoleID int
as 
begin
	-- Check Email
	if(exists (select * from Users as u where u.Email = @Email))
	begin
		return;
	end;

	-- Check Phone
	if(exists (select * from Users as u where u.Phone = @Phone))
	begin
		return;
	end;
	
	-- Let fuckking inserttt
	insert into Users(FullName, Email, Phone, RegistrationDate, RoleID)
	values (@FullName, @Email, @Phone, getdate(), @RoleID)
end
go
exec proc_AddUser
	@FullName = N'Chuong Doan',
	@Email = N'chuongdoan2102@gmail.com',
	@Phone = N'0389195503',
	@RoleID = 2