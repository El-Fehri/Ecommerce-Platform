<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('affiliates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('referral_code')->unique();
            $table->string('status')->default('pending'); // pending, approved, rejected
            $table->decimal('commission_rate', 5, 2)->default(5.00); // percentage
            $table->decimal('total_earnings', 12, 2)->default(0);
            $table->decimal('paid_earnings', 12, 2)->default(0);
            $table->decimal('pending_earnings', 12, 2)->default(0);
            $table->integer('total_referrals')->default(0);
            $table->integer('total_conversions')->default(0);
            $table->json('payment_details')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['tenant_id', 'user_id']);
            $table->index(['tenant_id', 'referral_code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affiliates');
    }
};
