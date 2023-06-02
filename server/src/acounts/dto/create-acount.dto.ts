import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  Min,
} from 'class-validator';
import { regexPhoneNumber } from 'src/common/regex/phone-number.regex';
import { CountryCodesEnum } from 'src/core/enums/country-codes.enum';
import { IsVietnamPhoneNumber } from 'src/core/validate/phone-number.custom-validator';

export class CreateAcountDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Nguyen van a' })
  @IsString()
  fullname: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @ApiProperty({ example: '0098989898' })
  @Matches(regexPhoneNumber)
  phone: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'Tungphich@12' })
  password: string;
  @IsNotEmpty()
  @IsEnum(CountryCodesEnum)
  @ApiProperty({
    enum: CountryCodesEnum,
    default: CountryCodesEnum.Vietnam,
  })
  country: CountryCodesEnum;
  @ApiPropertyOptional({ description: 'facebook name' })
  @IsOptional()
  facebook: string;
  @ApiPropertyOptional({ description: 'Google id' })
  @IsOptional()
  google: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'test0001' })
  // @Matches(usernameRegex, { message: 'Username is not format' })
  username: string;
  @IsNotEmpty()
  @ApiProperty()
  address: string;
  @ApiProperty({ format: 'binary', type: String })
  bg: Express.Multer.File;
  @ApiProperty({ format: 'binary', type: String })
  avt: Express.Multer.File;
  avatar: string;
  background: string;
}
