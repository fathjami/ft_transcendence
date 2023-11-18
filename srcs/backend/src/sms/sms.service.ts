import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;
  constructor(private readonly prismaService: PrismaService) {
    this.twilioClient = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  /**
   * Sends a verification code to the provided phone number
   * @param phoneNumber - The phone number to send the verification code to
   * @returns  - A message indicating that the verification code has been sent
   *
   * @throws BadRequestException - If the verification code could not be sent
   * @note - When the return type isn't specified, the TransformOperationExecutor.transform method in the class-transformer library.
   *        This method is used by the ClassSerializerInterceptor class to transform the response body
   *        will be called recursively, but for some reason, it's not terminating as expected.
   */
  async initiatePhoneNumberVerification(
    phoneNumber: string,
  ): Promise<{ status: string; message: string }> {
    const result = await this.twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phoneNumber,
        channel: 'sms',
      });

    if (result.status !== 'pending') {
      throw new BadRequestException('Unable to send verification code');
    }

    return {
      status: 'success',
      message: 'Verification code sent',
    };
  }

  async confirmPhoneNumberVerification(
    userId: number,
    phoneNumber: string,
    code: string,
  ) {
    const result = await this.twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phoneNumber,
        code,
      });

    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Invalid verification code');
    }

    return await this.updatePhoneNumberVerificationStatus(userId);
  }

  async updatePhoneNumberVerificationStatus(userId: number) {
    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        isPhoneNumberVerified: true,
      },
    });
  }
}